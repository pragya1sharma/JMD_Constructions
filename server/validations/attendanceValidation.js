// validations/attendanceValidation.js
import { z } from 'zod';

export const markAttendanceSchema = z.object({
    date: z.string().min(1, 'Date is required'),
    entries: z.array(
        z.object({
            category: z.string().min(1, 'Category is required'),
            count: z.number().min(0, 'Count cannot be negative')
        })
    ).min(1, 'At least one entry is required')
});

export const addCategorySchema = z.object({
    categoryName: z.string().min(1, 'Category name is required')
});