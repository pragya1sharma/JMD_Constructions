import { z } from 'zod';

export const createNoteSchema = z.object({
    notes: z.string().min(1, 'Note cannot be empty').max(500, 'Note too long'),
    metadata: z.object({}).optional().default({})
});

export const editNoteSchema = z.object({
    notes: z.string().min(1, 'Note cannot be empty').max(500, 'Note too long').optional(),
    metadata: z.object({}).optional()
});