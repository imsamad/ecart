const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Address = require('../models/Address');

// @desc      GET all my addresses
// @route     GET /api/v1/auth/address
// @access    Private/Protect
exports.getMyAddresses = asyncHandler(async (req, res, next) => {
  let address = await Address.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    data: { address },
  });
});

// @desc      Create address
// @route     POST /api/v1/auth/address
// @access    Private/Protect
exports.createAddress = asyncHandler(async (req, res, next) => {
  let address = new Address({ ...req.body, user: req.user.id });
  await address.save();

  res.status(200).json({
    success: true,
    data: { address },
  });
});

// @desc      Update product
// @route     PUT /api/v1/auth/address/:aid
// @access    Private/Protect
exports.updateAddress = asyncHandler(async (req, res, next) => {
  let address = await Address.findById(req.params.aid);

  if (!address) {
    return next(
      new ErrorResponse(`Address not found with id of ${req.params.aid}`, 404)
    );
  }

  if (address.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this Address`,
        401
      )
    );
  }

  address = await Address.findByIdAndUpdate(req.params.aid, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: { address },
  });
});

// @desc      Delete Address
// @route     DELETE /api/v1/auth/address/:aid
// @access    Private/Protect
exports.deleteAdddress = asyncHandler(async (req, res, next) => {
  let address = await Address.find({ _id: req.params.aid, user: req.user.id });

  if (!address) {
    return next(
      new ErrorResponse(`Address not found with id of ${req.params.aid}`, 404)
    );
  }

  await address.remove();

  res.status(200).json({
    success: true,
    data: { address },
  });
});
