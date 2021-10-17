const express = require('express');

const router = express.Router();

const {
  createOrder,
  getOrder,
  updateOrderToPaid,
} = require('../controllers/orderCtrl');

const { protect } = require('../middleware/auth');

router.route('/').post(protect, createOrder);
router.route('/:oid').get(protect, getOrder);
router.route('/:oid/pay').put(protect, updateOrderToPaid);

module.exports = router;
