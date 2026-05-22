import app from './app.js';
import connectDB from './config/database.js';
import dotenv from 'dotenv';
dotenv.config();


const PORT = process.env.PORT || 5173;

// Connect to MongoDB
connectDB();

// Start Express server
const server = app.listen(PORT, () => {
  console.log(`

NIRMAAN CONSTRUCTION BACKEND                  
Port: ${PORT}                                  
Mode: ${process.env.NODE_ENV || 'development'}  
API: http://localhost:${PORT}/api/v1         
Health: http://localhost:${PORT}/api/health

  `);
});

// Graceful shutdown on unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Unhandled Rejection: ${err.message}`);
  console.log('Shutting down server...');
  server.close(() => process.exit(1));
});

module.exports = server;