// server.js
import app from './app.js';
import connectDB from './config.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

const server = app.listen(PORT, () => {
    console.log(`
NIRMAAN CONSTRUCTION BACKEND
Port: ${PORT}
Mode: ${process.env.NODE_ENV || 'development'}
API:  http://localhost:${PORT}/api/v1
Health: http://localhost:${PORT}/api/health
    `);
});

process.on('unhandledRejection', (err) => {
    console.log(`Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
});

export default server;