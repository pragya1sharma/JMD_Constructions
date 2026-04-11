const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');
const AuthService = require('../services/authService');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        throw new ErrorResponse('Please login to continue', 401);
    }

    try {
        // 1. Verify JWT
        const decoded = AuthService.verifyToken(token);

        // 2. Check if user still exists in database
        const currentUser = await AuthService.validateIfExists(decoded.id);

        if (!currentUser) {
            throw new ErrorResponse('Session no longer valid. Please login again.', 401);
        }

        // 3. Attach full safe user object to req.user
        req.user = currentUser;     // Now contains id, name, role, phone, etc.

        next();
    } 
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new ErrorResponse('Session expired. Please login again', 401);
        }
        throw error;   // Re-throw other errors (including our custom one)
    }
});

exports.protect = protect;