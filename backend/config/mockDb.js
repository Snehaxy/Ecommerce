// Mock database for demo purposes when MongoDB is not available
const mockUsers = [
  {
    _id: '64f1a2b3c4d5e6f7g8h9i0j1',
    name: 'Test User',
    email: 'user@test.com',
    password: '$2a$10$2JUx7Vl3tycht8q6nN04FOepIj01ukwO9XbLTVi/xn7MgTjVmTXQm', // 'password123' hashed
    isAdmin: false
  },
  {
    _id: '64f1a2b3c4d5e6f7g8h9i0j2',
    name: 'Admin',
    email: 'admin@test.com',
    password: '$2a$10$2JUx7Vl3tycht8q6nN04FOepIj01ukwO9XbLTVi/xn7MgTjVmTXQm', // 'password123' hashed
    isAdmin: true
  }
];

const mockProducts = [
  {
    _id: '64f1a2b3c4d5e6f7g8h9i0j3',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM and 512GB SSD',
    price: 999.99,
    category: 'Electronics',
    countInStock: 5,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80'
  },
  {
    _id: '64f1a2b3c4d5e6f7g8h9i0j4',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with 2.4GHz connection',
    price: 29.99,
    category: 'Accessories',
    countInStock: 50,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&q=80'
  },
  {
    _id: '64f1a2b3c4d5e6f7g8h9i0j5',
    name: 'USB-C Cable',
    description: 'Fast charging USB-C cable, supports 100W PD',
    price: 14.99,
    category: 'Accessories',
    countInStock: 100,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&q=80'
  },
  {
    _id: '64f1a2b3c4d5e6f7g8h9i0j6',
    name: 'Monitor',
    description: '27" 4K Monitor with USB-C and HDR support',
    price: 399.99,
    category: 'Electronics',
    countInStock: 10,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80'
  },
  {
    _id: '64f1a2b3c4d5e6f7g8h9i0j7',
    name: 'Keyboard',
    description: 'Mechanical gaming keyboard with RGB lighting',
    price: 89.99,
    category: 'Accessories',
    countInStock: 25,
    image: 'https://images.unsplash.com/photo-1587829191301-bada3b76c4c1?w=500&q=80'
  },
  {
    _id: '64f1a2b3c4d5e6f7g8h9i0j8',
    name: 'Headphones',
    description: 'Noise-cancelling headphones with 30-hour battery',
    price: 199.99,
    category: 'Audio',
    countInStock: 15,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'
  }
];

const mockOrders = [];

module.exports = {
  mockUsers,
  mockProducts,
  mockOrders
};
