const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Order = require('../models/Order');
const Address = require('../models/Address');

// @desc      Get all users
// @route     POST /api/v1/orders
// @access    Private
exports.createOrder = asyncHandler(async (req, res, next) => {
  console.log('req.body', req.body);
  const { orderItems, shippingAddress, paymentMethod } = req.body;
  console.log('shippingAddress', shippingAddress);
  const user = req.user.id;

  const address = new Address({
    ...shippingAddress,
    country: 'India',
    user: user,
  });
  console.log('address pre', address);
  const order = new Order({
    orderItems: orderItems,
    address: address._id,
    user: user,
    paymentMethod,
  });
  console.log('order pre', order);
  await address.save();
  const newOrder = await order.save();
  console.log('newOrder', newOrder);
  res.json({ success: true, order: newOrder });
});

// @desc      Get single order
// @route     GET /api/v1/orders/:id
// @access    Private
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findOne({ user: req.user.id })
    .populate('orderItems.product')
    .populate('address');

  res.status(200).json({
    success: true,
    order: order,
  });
});
