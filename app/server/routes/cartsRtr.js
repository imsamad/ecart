const express = require('express');
const {
  createCart,
  getCart,
  removeProduct,
  incDecQty,
} = require('../controllers/cartsCtrl');

const { protect } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(protect(), getCart)
  .post(protect(), createCart)
  .put(protect(), removeProduct)
  .patch(protect(), incDecQty);

module.exports = router;
