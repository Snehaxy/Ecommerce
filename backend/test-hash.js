const bcrypt = require('bcryptjs');

async function generateHash() {
  const password = 'password123';
  const hash = await bcrypt.hash(password, 10);
  console.log('Password hash for "password123":', hash);
  
  // Test the hash
  const isValid = await bcrypt.compare('password123', hash);
  console.log('Hash verification:', isValid);
}

generateHash();
