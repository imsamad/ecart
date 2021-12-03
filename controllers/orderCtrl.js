const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Order = require('../models/Order');
const Address = require('../models/Address');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// @desc      Create order
// @route     POST /api/v1/orders
// @access    Private
exports.createOrder = asyncHandler(async (req, res, next) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;
  let subTotal = 0;

  try {
    let productIds = [];
    // Store valid product ids in this variable.
    for (var i = 0; i < orderItems.length; i++) {
      if (!mongoose.Types.ObjectId.isValid(orderItems[i].product)) {
        return next(new ErrorResponse('Please provide valid products.', 422));
      }
      productIds.push(orderItems[i].product);
    }

    const productExist = await Product.find({ _id: { $in: productIds } });

    if (!productExist || orderItems.length !== productExist.length) {
      return next(new ErrorResponse('Please provide valid products.', 400));
    }

    // Check if incoming orderItems qty exceed actual countInStock
    for (var i = 0; i < orderItems.length; i++) {
      const thisProduct = productExist.find(
        (p) => p.id === orderItems[i].product
      );
      if (thisProduct.countInStock < orderItems[i].qty) {
        return next(
          new ErrorResponse(
            "Please provide valid order's products quantity.",
            422
          )
        );
      }
      subTotal +=
        parseInt(thisProduct.price, 10) * parseInt(orderItems[i].qty, 10);
    }
  } catch (err) {
    return next(new ErrorResponse('Please provide valid products.', 400));
  }
  const user = req.user.id;
  const address = new Address({
    ...shippingAddress,
    country: 'India',
    user: user,
  });

  const taxPercentage = subTotal > 100 ? 3 : 7;
  const taxPrice = subTotal * (taxPercentage / 100);
  const shippingPrice = 10;
  const totalPrice = subTotal + shippingPrice + taxPrice;

  const order = new Order({
    orderItems: orderItems,
    address: address._id,
    user: user,
    paymentMethod,
    taxPercentage,
    taxPrice,
    shippingPrice,
    totalPrice,
    subTotal,
  });
  await address.save();
  const newOrder = await order.save();
  res.json({ success: true, data: { order: newOrder } });
});

// @desc      Get single order
// @route     GET /api/v1/orders/:id
// @access    Private
exports.getMyOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findOne({ _id: req.params.oid, user: req.user.id })
    .populate('orderItems.product')
    .populate('address');

  res.status(200).json({
    success: true,
    data: { order },
  });
});

//  Desc    Update order to paid
//  Route   PUT /api/orders/:oid/pay
//  Access  Private/Protect
exports.updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.oid);
  if (order) {
    if (req.body.status === 'COMPLETED') {
      order.isPaid = req.body.paid ?? true;
      order.paidAt = req.body.create_time ?? Date.now();
      order.paymentMethod = req.body.paymentMethod || 'payapl';
      order.paymentResult = {
        payerID: req.body.payer.payer_id,
        paymentID: req.body.id,
        paymentToken: req.body.payer.paymentToken ?? '',
        email: req.body.payer.email_address,
        returnUrl: req.body.payer.returnUrl ?? '',
      };
      const updatedOrder = await order.save();
      return res.status(200).json({
        success: true,
        data: { order: updatedOrder },
      });
    } else {
      return next(new ErrorResponse('Transaction failed.', 404));
    }
  } else {
    return next(new ErrorResponse('Order does not exist', 422));
  }
});

// @desc      Get current logged in user
// @route     GET /api/v1/orders/myorders
// @access    Private
exports.getMyOrders = asyncHandler(async (req, res, next) => {
  let orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    data: { orders },
  });
});

// @desc    Delete my order
// @route   DELETE /api/orders/:oid
// @access  Private
exports.deleteMyOrder = asyncHandler(async (req, res) => {
  const order = await Order.find({ id: req.params.id, user: req.user.id });

  if (!order) {
    return next(new ErrorResponse('Order not found', 404));
  }

  await order.remove();
  res.json({ status: true, data: {} });
});
