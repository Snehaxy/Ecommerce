const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');

require('dotenv').config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce');
    console.log('Connected to MongoDB');

    // Create admin user
    const admin = await User.findOne({ email: 'admin@test.com' });
    if (!admin) {
      const hashed = await bcrypt.hash('password123', 10);
      await User.create({
        name: 'Admin',
        email: 'admin@test.com',
        password: hashed,
        isAdmin: true
      });
      console.log('✓ Admin user created: admin@test.com / password123');
    } else {
      console.log('Admin user already exists');
    }

    // Create test user
    const user = await User.findOne({ email: 'user@test.com' });
    if (!user) {
      const hashed = await bcrypt.hash('password123', 10);
      await User.create({
        name: 'Test User',
        email: 'user@test.com',
        password: hashed,
        isAdmin: false
      });
      console.log('✓ Test user created: user@test.com / password123');
    } else {
      console.log('Test user already exists');
    }

    // Create sample products
    const sampleProducts = [
      { 
        name: 'Laptop', 
        description: 'High-performance laptop with 16GB RAM and 512GB SSD', 
        price: 999.99, 
        category: 'Electronics', 
        countInStock: 5,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80'
      },
      { 
        name: 'Wireless Mouse', 
        description: 'Ergonomic wireless mouse with 2.4GHz connection', 
        price: 29.99, 
        category: 'Accessories', 
        countInStock: 50,
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&q=80'
      },
      { 
        name: 'USB-C Cable', 
        description: 'Fast charging USB-C cable, supports 100W PD', 
        price: 14.99, 
        category: 'Accessories', 
        countInStock: 100,
        image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&q=80'
      },
      { 
        name: 'Monitor', 
        description: '27" 4K Monitor with USB-C and HDR support', 
        price: 399.99, 
        category: 'Electronics', 
        countInStock: 10,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80'
      },
      { 
        name: 'Keyboard', 
        description: 'Mechanical gaming keyboard with RGB lighting', 
        price: 89.99, 
        category: 'Accessories', 
        countInStock: 25,
        image: 'https://images.unsplash.com/photo-1587829191301-bada3b76c4c1?w=500&q=80'
      },
      { 
        name: 'Headphones', 
        description: 'Noise-cancelling headphones with 30-hour battery', 
        price: 199.99, 
        category: 'Audio', 
        countInStock: 15,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'
      }
    ];

    for (const p of sampleProducts) {
      const exists = await Product.findOne({ name: p.name });
      if (!exists) {
        await Product.create(p);
        console.log(`✓ Product created: ${p.name}`);
      }
    }

    console.log('\n✓ All done! You can now log in with:');
    console.log('Admin: admin@test.com / password123');
    console.log('User: user@test.com / password123');

    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();
