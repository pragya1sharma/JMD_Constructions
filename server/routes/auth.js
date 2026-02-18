const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');

// Import validation schemas
const { 
  registerSchema, 
  loginSchema 
} = require('../validations/authValidation');


router.post(
  '/register',
  validateRequest(registerSchema),
  AuthController.register
);


router.post(
  '/login',
  validateRequest(loginSchema),
  AuthController.login
);


router.get(
  '/me',
  protect,
  AuthController.getMe
);


router.post(
  '/logout',
  protect,
  AuthController.logout
);

module.exports = router;