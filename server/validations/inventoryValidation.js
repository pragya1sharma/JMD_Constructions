// validations/inventoryValidation.js
import { z } from 'zod';

export const createItemSchema = z.object({
    name: z.string().min(1, 'Item name is required').max(200),
    unit: z.string().min(1, 'Unit is required').max(40),
    restockThreshold: z.number().min(0).optional()
});

export const updateItemSchema = createItemSchema.partial();

export const stockSchema = z.object({
    quantity: z.number().min(1, 'Quantity must be at least 1')
});