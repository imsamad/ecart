const colors = require('colors');
require('dotenv').config({ path: './config/.env' });
const connectDB = require('./config/db');
connectDB();

// Load models
const Product = require('./models/Product');
const products = require('./_data/products.js');
const User = require('./models/User');
const users = require('./_data/users.js');
const Address = require('./models/Address');
const addresses = require('./_data/addresses.js');
// Import into DB
const importData = async () => {
  try {
    await Product.create(products);
    await User.create(users);
    await Address.create(addresses);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Address.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
