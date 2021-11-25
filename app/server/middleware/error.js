const errorHandler = (err, _req, res, _next) => {
  let error = { ...err };
  error.message = err.message;

  console.log("Err from middleware :- ", err.message);
  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    console.log("One ");
    const message = `Resource not found.`;
    error = { ...error, message, statusCode: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    console.log("Two ");
    const message = "Duplicate field value entered";
    error = { ...error, message, statusCode: 422 };
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    console.log("Three ");
    const message = Object.values(err.errors).map((val) => val.message);
    console.log("message.length ", message.length);
    error = {
      ...error,
      message: message.length === 1 ? message[0] : message,
      statusCode: 422,
    };
  }
  if (err.name === "ReferenceError") {
    console.log("Four ");
    const message = "Server Busy , Try again.";
    // Log to dashboard panel these type of errors to token to dev team.
    error = { ...error, message, statusCode: 500 };
  }
  res.status(error.statusCode || 500).json({
    success: false,
    error: true,
    message: error.message || "Server Error",
    status: error.statusCode || 500,
  });
};

module.exports = errorHandler;
