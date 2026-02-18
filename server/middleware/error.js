const ErrorResponse = require('../utils/errorResponse');

/**
 * GLOBAL ERROR HANDLER
 * Catches ALL errors in Express app
 * Must be last middleware in app.js
 */
const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error('Error:', err.name, '->', err.message);

  let error = { ...err };
  error.message = err.message;

  // Handle specific error types
  //This just makes it easy for us to debug incase something is breaking and also to send proper messages to client

  // 1. Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    error = new ErrorResponse('Resource not found', 404);
  }

  // 2. Mongoose duplicate key (email already exists)
  if (err.code === 11000) {
    error = new ErrorResponse('Email already registered', 400);
  }

  // 3. Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = new ErrorResponse(message, 400);
  }

  // 4. JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new ErrorResponse('Invalid token', 401);
  }
  
  if (err.name === 'TokenExpiredError') {
    error = new ErrorResponse('Token expired', 401);
  }

  // Send error response
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server error'
  });
};

module.exports = errorHandler;