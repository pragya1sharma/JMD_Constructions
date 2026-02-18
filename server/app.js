const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');


// Import routes
const authRoutes = require('./routes/auth');

// Import error handler (must be last middleware)
const errorHandler = require('./middleware/error');

const app = express();

// ======================
// SECURITY MIDDLEWARE
// ======================

// Basic security headers (remove duplicate helmet() call)
app.use(helmet());

// ======================
// BODY PARSING
// ======================

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// ======================
// CORS CONFIGURATION
// ======================

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// ======================
// LOGGING
// ======================

// Only log in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ======================
// API ROUTES
// ======================

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Nirmaan Construction API is running 🚧',
    timestamp: new Date().toISOString()
  });
});


app.get('/api/v1', (req, res) => {
  res.json({
    message: 'Welcome to Nirmaan Construction Management API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/v1/auth',
      health: '/api/health'
    }
  });
});

// Authentication routes
app.use('/api/v1/auth', authRoutes);

// ======================
// ERROR HANDLING
// ======================

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `The endpoint ${req.originalUrl} does not exist`
  });
});

// Global error handler (MUST BE THE LAST MIDDLEWARE)
app.use(errorHandler);

module.exports = app;