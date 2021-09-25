const colors = require('colors');
require('dotenv').config({ path: './config/.env' });
const connectDB = require('./config/db');
connectDB();

// Load models
const Product = require('./models/Product');
const products = require('./_data/products.js');
// Import into DB
const importData = async () => {
  try {
    await Product.create(products);
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
