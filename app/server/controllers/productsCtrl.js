const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Product = require('../models/Product');

// @desc      Get all products
// @route     GET /api/v1/products
// @access    Public
exports.getProducts = asyncHandler(async (_req, res, _next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single product
// @route     GET /api/v1/products/:pid
// @access    Public
exports.getProduct = asyncHandler(async (req, res, _next) => {
  const product = await Product.findById(req.params.pid);
  res.status(200).json(product);
});
