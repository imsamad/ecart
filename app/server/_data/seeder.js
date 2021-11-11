const colors = require('colors');
const connectDB = require('../config/db');
connectDB();

// Load models
const Product = require('../models/Product');
const products = require('./products.js');
const User = require('../models/User');
const users = require('./users.js');
// Import into DB
const importData = async () => {
  try {
    await Product.create(products);
    await User.create(users);
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
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[3] === '-i') {
  // console.log('Import ');
  importData();
} else if (process.argv[3] === '-d') {
  // console.log('Delete ');
  deleteData();
}
