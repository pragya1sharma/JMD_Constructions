// routes/inventory.js
import express from 'express';
import InventoryController from '../controllers/inventoryController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validation.js';
import { createItemSchema, updateItemSchema, stockSchema } from '../validations/inventoryValidation.js';

const router = express.Router();

router.post('/:projectId', protect, authorize('Contractor'), validateRequest(createItemSchema), InventoryController.createItem);
router.get('/:projectId', protect, InventoryController.getProjectInventory);
router.get('/:projectId/low-stock', protect, InventoryController.getLowStockItems);
router.get('/item/:id', protect, InventoryController.getItemById);
router.get('/item/:id/logs', protect, InventoryController.getUsageLogs);
router.put('/item/:id', protect, authorize('Contractor'), validateRequest(updateItemSchema), InventoryController.updateItem);
router.delete('/item/:id', protect, authorize('Contractor'), InventoryController.deleteItem);
router.post('/item/:id/add-stock', protect, validateRequest(stockSchema), InventoryController.addStock);
router.post('/item/:id/use-stock', protect, validateRequest(stockSchema), InventoryController.useStock);

export default router;