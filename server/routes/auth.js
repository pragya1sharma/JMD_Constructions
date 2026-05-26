import express from 'express';
import AuthController from '../controllers/authController.js';
import { protect ,authorize} from '../middleware/auth.js';
import { validateRequest } from '../middleware/validation.js';
import { loginLimiter } from '../middleware/rateLimiter.js';
import { registerSchema, loginSchema } from '../validations/authValidation.js';



const router = express.Router();

// Public routes — no protect needed
router.post('/register', validateRequest(registerSchema), AuthController.register);
router.post('/login',loginLimiter, validateRequest(loginSchema), AuthController.login);

// Protected routes — must be logged in
router.get('/me', protect, AuthController.getMe);
router.post('/logout', protect, AuthController.logout);
router.put('/change-password', protect, AuthController.changePassword);
router.delete('/delete/:id', protect, authorize('Contractor'), AuthController.deleteUser);

export default router;