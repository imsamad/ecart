const express = require('express');
const { getProducts, getProduct } = require('../controllers/productsCtrl');

const Product = require('../models/Product');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
// const { protect, authorize } = require('../middleware/auth');

// router.use(protect);
// router.use(authorize('admin'));

router.route('/').get(advancedResults(Product), getProducts);
router.route('/:pid').get(getProduct);

module.exports = router;
