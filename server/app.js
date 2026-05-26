// app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// Import routes
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import tenderRoutes from './routes/tender.js';
import vendorRoutes from './routes/vendor.js';
import workerRoutes from './routes/worker.js';
import inventoryRoutes from './routes/inventory.js';
import attendanceRoutes from './routes/attendance.js';
import notesRoutes from './routes/manualNotes.js';
import dashboardRoutes from './routes/dashBoard.js';

// Import error handler
import errorHandler from './middleware/error.js';

const app = express();

// Security
app.use(helmet());

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Nirmaan Construction API is running 🚧',
        timestamp: new Date().toISOString()
    });
});

// API info
app.get('/api/v1', (req, res) => {
    res.json({
        message: 'Welcome to Nirmaan Construction Management API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/v1/auth',
            projects: '/api/v1/projects',
            tenders: '/api/v1/tenders',
            vendors: '/api/v1/vendors',
            workers: '/api/v1/workers',
            inventory: '/api/v1/inventory',
            attendance: '/api/v1/attendance',
            notes: '/api/v1/notes',
            dashboard: '/api/v1/dashboard',
            health: '/api/health'
        }
    });
});

// Mount routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/tenders', tenderRoutes);
app.use('/api/v1/vendors', vendorRoutes);
app.use('/api/v1/workers', workerRoutes);
app.use('/api/v1/inventory', inventoryRoutes);
app.use('/api/v1/attendance', attendanceRoutes);
app.use('/api/v1/notes', notesRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Global error handler — MUST BE LAST
app.use(errorHandler);

export default app;