const express = require('express');

const combineRouter = express.Router();

// Route files
const auth = require('./authRtr');
const products = require('./productsRtr');
const orders = require('./orderRtr');

// Mount routers
combineRouter.use('/api/v1/auth', auth);
combineRouter.use('/api/v1/products', products);
combineRouter.use('/api/v1/orders', orders);
combineRouter.get('/api/v1', (req, res) =>
  res.json({ msg: 'Yes API is running...' })
);

module.exports = combineRouter;
