const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Address = require('../models/Address');
// @desc      Get address of respected user
// @route     GET /api/v1/address
// @access    Protect
exports.getAddress = asyncHandler(async (req, res, next) => {
  const address = await Address.findById(req.user._id);
  if (!address) {
    return next(new ErrorResponse('No address exist', 202));
  } else {
    return res.status(200).json(address);
  }
});
