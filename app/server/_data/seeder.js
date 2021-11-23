require("dotenv").config({ path: "../config/.env" });
const colors = require("colors");

// Load models
const Product = require("../models/Product");
const products = require("./products.js");
const User = require("../models/User");
const users = require("./users.js");

// Import into DB
const connectDB = require("../config/connectDB");
connectDB();

const importData = async () => {
  try {
    await Product.create(products);
    await User.create(users);
    console.log("Data Imported...".green.inverse);
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
    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};
// function exec() {
if (process.argv[2] === "-i") {
  // console.log('Import');
  importData();
} else if (process.argv[2] === "-d") {
  // console.log("Delete");
  deleteData();
}
// }
