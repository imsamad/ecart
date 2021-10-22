const errorHandler = (err, _req, res, _next) => {
  let error = { ...err };
  error.message = err.message;
  console.log('Err ', err);
  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = { ...error, message, statusCode: 404 };
    // error.message = message;
    // error.statusCode=404
    // error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { ...error, message, statusCode: 400 };
    // error.message = message;
    // error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    // const message = Object.values(err.errors).map((val) => val.message);
    const message = 'Invalid data';
    error = { ...error, message, statusCode: 400 };
    // error = new ErrorResponse(message, 400);
  }
  if (err.name === 'ReferenceError') {
    const message = 'Server Busy , Try again.';
    // Log to dashboard panel these type of errors to token to dev team.
    error = { ...error, message, statusCode: 500 };
  }
  res.status(error.statusCode || 500).json({
    success: false,
    error: true,
    message: error.message || 'Server Error',
    status: error.statusCode || 500,
  });
};

module.exports = errorHandler;
