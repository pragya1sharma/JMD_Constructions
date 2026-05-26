// routes/worker.js
import express from 'express';
import WorkerController from '../controllers/workerController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validation.js';
import { addWorkerSchema, updateWorkerSchema } from '../validations/workerValidation.js';

const router = express.Router();

router.post('/:projectId', protect, authorize('Contractor'), validateRequest(addWorkerSchema), WorkerController.addWorker);
router.get('/:projectId', protect, WorkerController.getProjectWorkers);
router.get('/worker/:id', protect, WorkerController.getWorkerById);
router.put('/:id', protect, authorize('Contractor'), validateRequest(updateWorkerSchema), WorkerController.updateWorker);
router.delete('/:id', protect, authorize('Contractor'), WorkerController.deactivateWorker);

export default router;