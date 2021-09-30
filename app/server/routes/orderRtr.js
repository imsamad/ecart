const express = require('express');

const router = express.Router();

const { createOrder } = require('../controllers/orderCtrl');

const { protect } = require('../middleware/auth');

router.route('/').post(protect(), createOrder);

module.exports = router;
