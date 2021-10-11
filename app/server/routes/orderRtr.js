const express = require('express');

const router = express.Router();

const { createOrder, getOrder } = require('../controllers/orderCtrl');

const { protect } = require('../middleware/auth');

router.route('/').post(protect(), createOrder);
router.route('/:oid').get(protect(), getOrder);

module.exports = router;
