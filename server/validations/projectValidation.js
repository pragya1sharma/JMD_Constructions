// validations/projectValidation.js
import { z } from 'zod';

export const createProjectSchema = z.object({
    name: z.string().min(1, 'Project name is required').max(300),
    status: z.enum(['Running', 'Completed', 'Future']),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().optional(),
    expectedEndDate: z.string().optional(),
    expectedBudget: z.number().min(0, 'Budget cannot be negative'),
    assignedSupervisor: z.string().min(1, 'Supervisor is required'),
    siteLocation: z.object({
        address: z.string().min(1, 'Address is required').max(500),
        googleMapsLink: z.string().max(2000).optional()
    }),
    notes: z.string().max(2000).optional(),
    pinned: z.boolean().optional()
});

export const updateProjectSchema = createProjectSchema.partial();
// .partial() makes all fields optional — perfect for updates
// no need to rewrite the whole schema

export const assignSupervisorSchema = z.object({
    supervisorId: z.string().min(1, 'Supervisor ID is required')
});