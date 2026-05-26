// validations/workerValidation.js
import { z } from 'zod';

export const addWorkerSchema = z.object({
    name: z.string().min(1, 'Worker name is required').max(120),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone').optional(),
    roleOnSite: z.string().max(80).optional(),
    notes: z.string().max(500).optional()
});

export const updateWorkerSchema = addWorkerSchema.partial();