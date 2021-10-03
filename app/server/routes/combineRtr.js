const express = require('express');

const combineRouter = express.Router();

// Route files
const auth = require('./authRtr');
const products = require('./productsRtr');
<<<<<<< HEAD
const orders = require('./orderRtr');
=======
const carts = require('./cartsRtr');
const address = require('./addressRtr');
>>>>>>> 19d55104b9b857755dca65eb1a18312434d4bb69

// Mount routers
combineRouter.use('/api/v1/auth', auth);
combineRouter.use('/api/v1/products', products);
<<<<<<< HEAD
combineRouter.use('/api/v1/orders', orders);
=======
combineRouter.use('/api/v1/carts', carts);
combineRouter.use('/api/v1/address', address);
>>>>>>> 19d55104b9b857755dca65eb1a18312434d4bb69
combineRouter.get('/api/v1', (req, res) =>
  res.json({ msg: 'Yes API is running...' })
);

module.exports = combineRouter;
