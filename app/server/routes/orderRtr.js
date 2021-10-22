const express = require('express');

const router = express.Router();

const {
  createOrder,
  getMyOrder,
  updateOrderToPaid,
  getMyOrders,
  deleteMyOrder,

  getAllOrders,
  updateOrderToDelivered,
} = require('../controllers/orderCtrl');

const { protect, authorize } = require('../middleware/auth');

router.route('/admin').get(protect, authorize('admin', 'seller'), getAllOrders);

router
  .route('/admin/:oid/deliver')
  .put(protect, authorize('admin'), updateOrderToDelivered);

router.route('/').post(protect, createOrder);

router.route('/myorders').get(protect, getMyOrders);

router.route('/:oid').get(protect, getMyOrder).delete(protect, deleteMyOrder);

router.route('/:oid/pay').put(protect, updateOrderToPaid);

module.exports = router;
