const { validationResult } = require('express-validator');

/**
 * VALIDATION MIDDLEWARE
 * Generic middleware to validate any request
 */
const validateRequest = (validations) => {
  return async (req, res, next) => {
    // Run all validations and then execute the functions
    await Promise.all(validations.map(validation => validation.run(req)));

    
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
      return next();
    }

    
    const formattedErrors = errors.array().map(err => ({
      field: err.path,
      message: err.msg,
      value: err.value
    }));

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: formattedErrors
    });
  };
};

module.exports = { validateRequest };