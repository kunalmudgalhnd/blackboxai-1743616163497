const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @route   POST api/orders
// @desc    Create new order
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('items', 'Items are required').isArray({ min: 1 }),
      check('shippingAddress', 'Shipping address is required').not().isEmpty(),
      check('paymentMethod', 'Payment method is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { items, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice } = req.body;

    try {
      // Verify all products exist and have sufficient stock
      for (const item of items) {
        const product = await Product.findById(item.product);
        if (!product) {
          return res.status(404).json({ msg: `Product not found: ${item.product}` });
        }
        if (product.stock < item.quantity) {
          return res.status(400).json({ msg: `Insufficient stock for: ${product.name}` });
        }
      }

      // Create order
      const order = new Order({
        user: req.user.id,
        items,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice
      });

      // Update product stock
      for (const item of items) {
        await Product.findByIdAndUpdate(
          item.product,
          { $inc: { stock: -item.quantity } },
          { new: true }
        );
      }

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/orders/myorders
// @desc    Get logged in user orders
// @access  Private
router.get('/myorders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('items.product', 'name price imageUrl');
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'items.product',
      'name price imageUrl'
    );

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Check if user owns the order or is admin
    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Order not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/orders/:id/pay
// @desc    Update order to paid
// @access  Private
router.put('/:id/pay', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/orders
// @desc    Get all orders (Admin)
// @access  Private/Admin
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('user', 'firstName lastName email');
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/orders/:id/deliver
// @desc    Update order to delivered (Admin)
// @access  Private/Admin
router.put('/:id/deliver', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;