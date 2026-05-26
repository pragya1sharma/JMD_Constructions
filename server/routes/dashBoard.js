// routes/dashBoard.js
import express from 'express';
import DashboardController from '../controllers/dashboardStatsController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/contractor', protect, authorize('Contractor'), DashboardController.getContractorStats);
router.get('/supervisor/:projectId', protect, authorize('Supervisor'), DashboardController.getSupervisorStats);
router.get('/tenders/open', protect, DashboardController.getOpenTenderCount);

export default router;