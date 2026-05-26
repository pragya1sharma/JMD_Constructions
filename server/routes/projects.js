
import express from 'express';
import ProjectController from '../controllers/projectController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validation.js';
import { createProjectSchema, updateProjectSchema, assignSupervisorSchema } from '../validations/projectValidation.js';

const router = express.Router();

router.post('/', protect, authorize('Contractor'), validateRequest(createProjectSchema), ProjectController.createProject);
router.get('/', protect, ProjectController.showFiltered);
router.get('/:id', protect, ProjectController.getProjectById);
router.put('/:id', protect, authorize('Contractor'), validateRequest(updateProjectSchema), ProjectController.updateProject);
router.delete('/:id', protect, authorize('Contractor'), ProjectController.deleteProject);
router.put('/:id/supervisor', protect, authorize('Contractor'), validateRequest(assignSupervisorSchema), ProjectController.assignSupervisor);

export default router;