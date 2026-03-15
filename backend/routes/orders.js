const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');
const { mockProducts, mockOrders } = require('../config/mockDb');

const router = express.Router();

// Create order
router.post('/', protect, async (req, res) => {
  const { items, totalPrice } = req.body;
  try {
    // Check stock availability and update stock
    for (const item of items) {
      let product = null;
      
      // Try MongoDB first, fallback to mock
      try {
        product = await Product.findById(item.product);
      } catch (err) {
        // MongoDB not available, use mock
        product = mockProducts.find(p => p._id === item.product);
      }
      
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.name}` });
      }
      if (product.countInStock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}. Available: ${product.countInStock}, Requested: ${item.quantity}` 
        });
      }
      
      // Reduce stock
      try {
        product.countInStock -= item.quantity;
        await product.save();
      } catch (err) {
        // MongoDB failed, update mock
        const index = mockProducts.findIndex(p => p._id === item.product);
        if (index !== -1) {
          mockProducts[index].countInStock -= item.quantity;
        }
      }
    }

    // Create order
    try {
      const order = await Order.create({
        user: req.user._id,
        items,
        totalPrice
      });
      res.status(201).json(order);
    } catch (err) {
      // MongoDB failed, create mock order
      const newOrder = {
        _id: Date.now().toString(),
        user: req.user._id,
        items,
        totalPrice,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      mockOrders.push(newOrder);
      res.status(201).json(newOrder);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user orders
router.get('/', protect, async (req, res) => {
  try {
    // Try MongoDB first, fallback to mock
    try {
      const orders = await Order.find({ user: req.user._id }).populate('items.product');
      res.json(orders);
    } catch (err) {
      // MongoDB not available, use mock
      const userOrders = mockOrders.filter(order => order.user === req.user._id);
      res.json(userOrders);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
