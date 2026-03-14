const express = require('express');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');
const { mockProducts } = require('../config/mockDb');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Try MongoDB first, fallback to mock
    try {
      const q = req.query.q;
      const filter = q ? { name: { $regex: q, $options: 'i' } } : {};
      const products = await Product.find(filter).limit(50);
      res.json(products);
    } catch (err) {
      // MongoDB not available, use mock
      res.json(mockProducts);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', protect, admin, async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

router.get('/:id', async (req, res) => {
  try {
    // Try MongoDB first, fallback to mock
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (err) {
      // MongoDB not available, use mock
      const product = mockProducts.find(p => p._id === req.params.id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', protect, admin, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
});

router.delete('/:id', protect, admin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
