// routes/vendor.js
import express from 'express';
import VendorController from '../controllers/vendorController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validation.js';
import { createVendorSchema, updateVendorSchema } from '../validations/vendorValidation.js';

const router = express.Router();

router.post('/', protect, authorize('Contractor'), validateRequest(createVendorSchema), VendorController.createVendor);
router.get('/', protect, VendorController.getAllVendors);
router.get('/:id', protect, VendorController.getVendorById);
router.put('/:id', protect, authorize('Contractor'), validateRequest(updateVendorSchema), VendorController.updateVendor);
router.delete('/:id', protect, authorize('Contractor'), VendorController.deleteVendor);

export default router;