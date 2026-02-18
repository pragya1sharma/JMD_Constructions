/**
 * ERROR RESPONSE CLASS
 * Custom error class for operational errors
 * (user errors, validation errors,etc.) -> this is what we ar egoing to use in the error middleware.
 * this extends the built-in Error class of JavaScript
 */
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    
    // Mark as operational error (not programming error)
    this.isOperational = true;
    
    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorResponse;