const express = require('express');

const router = express.Router();

const {
  createOrder,
  getMyOrder,
  updateOrderToPaid,
  getMyOrders,
  deleteMyOrder,
} = require('../controllers/orderCtrl');

const { protect } = require('../middleware/auth');

router.route('/').post(protect, createOrder);

router.route('/myorders').get(protect, getMyOrders);

router.route('/:oid').get(protect, getMyOrder).delete(protect, deleteMyOrder);

router.route('/:oid/pay').put(protect, updateOrderToPaid);

module.exports = router;
