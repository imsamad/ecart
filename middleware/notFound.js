const ErrorResponse = require('../utils/errorResponse');
const notFound = (req, res, next) => {
  const error = new ErrorResponse(
    `Not Found - ${req.protocol}://${req.get('host')}${req.originalUrl}`,
    404
  );
  res.status(404);
  next(error);
};
module.exports = notFound;
