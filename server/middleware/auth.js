const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');
const AuthService = require('../services/authService');
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ErrorResponse('Please login continue', 401);
  }

  try {
    const decoded = AuthService.verifyToken(token);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    throw new ErrorResponse('Session expired. Please login again', 401);
  }
});

exports.protect = protect;