const express = require('express');

const combineRouter = express.Router();
// const errorHandler = require('../middleware/error');
// const notFound = require('../middleware/notFound');

// Route files
const auth = require('./authRtr');
const products = require('./productsRtr');
const carts = require('./cartsRtr');

// Mount routers
combineRouter.use('/api/v1/auth', auth);
combineRouter.use('/api/v1/products', products);
combineRouter.use('/api/v1/carts', carts);
combineRouter.get('/api/v1', (req, res) =>
  res.json({ msg: 'Yes API is running...' })
);

module.exports = combineRouter;
