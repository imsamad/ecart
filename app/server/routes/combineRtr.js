const express = require('express');

const combineRouter = express.Router();

// Route files
const auth = require('./authRtr');
const products = require('./productsRtr');
const orders = require('./orderRtr');

const ErrorResponse = require('../utils/errorResponse');

// Mount routers
combineRouter.use('/api/v1/auth', auth);
combineRouter.use('/api/v1/products', products);
combineRouter.use('/api/v1/orders', orders);
combineRouter.get('/api/v1', (req, res, next) => {
  const obj = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }];
  for (var i = 0; i < obj.length; i++) {
    var val = obj[i];
    if (val.a === 3) {
      // return next(new ErrorResponse('Burned out...'));
      return res.json({ msf: 'Ok burned out' });
    }
    console.log('Val', val);
  }
  res.json({ msg: 'Yes API is running...' });
});

module.exports = combineRouter;
