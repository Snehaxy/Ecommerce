const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Create order
router.post('/', protect, async (req, res) => {
  const { items, totalPrice } = req.body;
  try {
    // Check stock availability and update stock
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.name}` });
      }
      if (product.countInStock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}. Available: ${product.countInStock}, Requested: ${item.quantity}` 
        });
      }
      // Reduce stock
      product.countInStock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      totalPrice
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user orders
router.get('/', protect, async (req, res) => {
  try {
    debugger
    const orders = await Order.find({ user: req.user._id }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
