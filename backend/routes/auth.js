const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { mockUsers } = require('../config/mockDb');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Try MongoDB first, fallback to mock
    let exists;
    try {
      exists = await User.findOne({ email });
    } catch (err) {
      // MongoDB not available, use mock
      exists = mockUsers.find(u => u.email === email);
    }
    
    if (exists) return res.status(400).json({ message: 'Email exists' });
    
    const hashed = await bcrypt.hash(password, 10);
    
    // Try to save to MongoDB, fallback to mock
    try {
      const user = await User.create({ name, email, password: hashed });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
      res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
      // MongoDB failed, create mock user
      const mockUser = {
        _id: Date.now().toString(),
        name,
        email,
        password: hashed,
        isAdmin: false
      };
      mockUsers.push(mockUser);
      const token = jwt.sign({ id: mockUser._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
      res.json({ token, user: { id: mockUser._id, name: mockUser.name, email: mockUser.email } });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = null;
    
    // Try MongoDB first
    try {
      user = await User.findOne({ email });
    } catch (err) {
      // MongoDB not available, use mock
      user = mockUsers.find(u => u.email === email);
    }
    
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
