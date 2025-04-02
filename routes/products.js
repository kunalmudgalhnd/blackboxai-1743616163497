const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST api/products
// @desc    Create a product
// @access  Private/Admin
router.post(
  '/',
  [
    auth,
    adminAuth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('price', 'Price is required').isFloat({ min: 0 }),
      check('category', 'Category is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, price, description, category, imageUrl, stock } = req.body;

    try {
      const newProduct = new Product({
        name,
        price,
        description,
        category,
        imageUrl,
        stock,
        user: req.user.id
      });

      const product = await newProduct.save();
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   PUT api/products/:id
// @desc    Update a product
// @access  Private/Admin
router.put('/:id', [auth, adminAuth], async (req, res) => {
  const { name, price, description, category, imageUrl, stock } = req.body;

  const productFields = {};
  if (name) productFields.name = name;
  if (price) productFields.price = price;
  if (description) productFields.description = description;
  if (category) productFields.category = category;
  if (imageUrl) productFields.imageUrl = imageUrl;
  if (stock) productFields.stock = stock;

  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: productFields },
      { new: true }
    );

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/products/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    await product.remove();
    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;