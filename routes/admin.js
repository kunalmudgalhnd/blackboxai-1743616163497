const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

// Admin Dashboard Stats
router.get('/dashboard', protect, admin, async (req, res) => {
  try {
    const [users, products, orders] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments()
    ]);
    
    const revenue = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    res.status(200).json({
      users,
      products,
      orders,
      revenue: revenue[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Product Management
router.route('/products')
  .get(protect, admin, async (req, res) => {
    try {
      const products = await Product.find().sort('-createdAt');
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .post(protect, admin, async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// User Management
router.get('/users', protect, admin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Order Management
router.get('/orders', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort('-createdAt');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;