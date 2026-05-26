// validations/vendorValidation.js
import { z } from 'zod';

export const createVendorSchema = z.object({
    name: z.string().min(1, 'Vendor name is required').max(200),
    category: z.string().max(100).optional(),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone').optional(),
    email: z.string().email('Invalid email').max(120).optional(),
    address: z.string().max(500).optional(),
    gstNumber: z.string().max(20).optional(),
    notes: z.string().max(2000).optional(),
    rating: z.number().min(0).max(5).optional()
});

export const updateVendorSchema = createVendorSchema.partial();