const express = require('express');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  debugger
  const q = req.query.q;
  const filter = q ? { name: { $regex: q, $options: 'i' } } : {};
  const products = await Product.find(filter).limit(50);
  res.json(products);
});

router.post('/', protect, admin, async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
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
