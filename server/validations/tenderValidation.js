// validations/tenderValidation.js
import { z } from 'zod';

export const createTenderSchema = z.object({
    name: z.string().min(1, 'Tender name is required').max(300),
    description: z.string().max(5000).optional(),
    url: z.string().url('Invalid URL').max(2000).optional(),
    deadline: z.string().optional(),
    status: z.enum(['Open', 'Submitted', 'Awarded', 'Lost', 'Closed', 'Withdrawn']).optional()
});

export const updateTenderSchema = createTenderSchema.partial().extend({
    toggleInterest: z.boolean().optional(),
    togglePin: z.boolean().optional()
});

export const deleteTenderSchema = z.object({
    action: z.enum(['delete', 'convert'], { message: 'Action must be delete or convert' }),
    extraData: z.object({
        assignedContractor: z.string().optional(),
        assignedSupervisor: z.string().optional()
    }).optional()
});