const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Try multiple MongoDB URIs with timeout settings
    const mongoUris = [
      process.env.MONGO_URI,
      'mongodb+srv://admin:admin123@cluster0.abcdef.mongodb.net/ecommerce?retryWrites=true&w=majority',
      'mongodb+srv://user:userpass@mongodb.net/ecommerce?retryWrites=true&w=majority'
    ];
    
    let conn = null;
    for (const uri of mongoUris) {
      if (uri) {
        try {
          // Add connection options for better reliability
          const options = {
            serverSelectionTimeoutMS: 5000, // 5 second timeout
            socketTimeoutMS: 45000, // 45 second timeout
            bufferMaxEntries: 0, // Disable mongoose buffering
            bufferCommands: false, // Disable mongoose buffering
          };
          
          conn = await mongoose.connect(uri, options);
          console.log(`MongoDB connected: ${conn.connection.host}`);
          return;
        } catch (err) {
          console.log(`Failed to connect to ${uri}:`, err.message);
        }
      }
    }
    
    if (!conn) {
      console.log('Warning: Could not connect to MongoDB, continuing without database...');
    }
  } catch (err) {
    console.error('Database connection error:', err);
    // Don't exit, just continue without database
  }
};

module.exports = connectDB;
