import asyncHandler from 'express-async-handler';
import ErrorResponse from '../utils/errorResponse.js';
import AuthService from '../services/authService.js';


//protect will be used in mostly all of the routes excrpt for registration and logging in.
//ensures ki tumm logged in ho aur tumhare pass valid jwt token hai before you perform the actions.

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        throw new ErrorResponse('Please login to continue', 401);
    }

    const decoded = AuthService.verifyToken(token);
    const currentUser = await AuthService.validateIfExists(decoded.id);

    if (!currentUser) {
        throw new ErrorResponse('Session no longer valid. Please login again.', 401);
    }

    req.user = currentUser;
    next();
});

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new ErrorResponse(
                `Access denied. This action requires: ${roles.join(', ')}`,
                403
            );
        }
        next();
    };
};

export { protect, authorize };