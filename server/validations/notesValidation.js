// validations/notesValidation.js
import { z } from 'zod';

export const createNoteSchema = z.object({
    message: z.string().min(1, 'Note cannot be empty').max(2000, 'Note too long')
});

export const editNoteSchema = z.object({
    message: z.string().min(1, 'Note cannot be empty').max(2000, 'Note too long')
});