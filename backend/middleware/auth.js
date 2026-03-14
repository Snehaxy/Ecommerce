const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { mockUsers } = require('../config/mockDb');

const protect = async (req, res, next) => {
  let token = req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ? req.headers.authorization.split(' ')[1]
    : null;

  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    
    // Try MongoDB first, fallback to mock
    try {
      req.user = await User.findById(decoded.id).select('-password');
    } catch (err) {
      // MongoDB not available, use mock
      req.user = mockUsers.find(u => u._id === decoded.id);
      if (req.user) {
        // Remove password from mock user
        const { password, ...userWithoutPassword } = req.user;
        req.user = userWithoutPassword;
      }
    }
    
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalid' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) return next();
  return res.status(403).json({ message: 'Admin required' });
};

module.exports = { protect, admin };
