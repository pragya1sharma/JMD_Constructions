// routes/tender.js
import express from 'express';
import TenderController from '../controllers/tenderController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validation.js';
import { createTenderSchema, updateTenderSchema, deleteTenderSchema } from '../validations/tenderValidation.js';

const router = express.Router();

router.post('/', protect, authorize('Contractor'), validateRequest(createTenderSchema), TenderController.createTender);
router.get('/', protect, TenderController.getAllTenders);
router.get('/:id', protect, TenderController.getTenderById);
router.put('/:id', protect, validateRequest(updateTenderSchema), TenderController.updateTender);
router.delete('/:id', protect, authorize('Contractor'), validateRequest(deleteTenderSchema), TenderController.deleteTender);

export default router;