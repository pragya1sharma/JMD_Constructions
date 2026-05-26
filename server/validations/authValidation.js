// validations/authValidation.js
import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(1, 'Name is required').max(50, 'Name too long'),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['Contractor', 'Supervisor'], { message: 'Role must be Contractor or Supervisor' })
});

export const loginSchema = z.object({
    phone: z.string().min(1, 'Phone is required'),
    password: z.string().min(1, 'Password is required')
});

export const changePasswordSchema = z.object({
    oldPassword: z.string().min(1, 'Old password is required'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters')
});