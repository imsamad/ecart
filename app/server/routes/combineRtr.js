const express = require('express');

const combineRouter = express.Router();

// Route files
const auth = require('./authRtr');
const products = require('./productsRtr');
const orders = require('./orderRtr');
const data = require('./dataRtr');

const ErrorResponse = require('../utils/errorResponse');

// Mount routers
combineRouter.use('/api/v1/auth', auth);
combineRouter.use('/api/v1/products', products);
combineRouter.use('/api/v1/orders', orders);
combineRouter.use('/api/v1/data', data);

module.exports = combineRouter;
