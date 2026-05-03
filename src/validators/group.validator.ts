import z from 'zod';
import { GROUP_STATUSES } from '../models/group.model.js';

export const groupQuerySchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  status: z.enum(GROUP_STATUSES).optional(),
  location: z.coerce.number().int().positive().optional(),
  member: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export type GroupQuery = z.infer<typeof groupQuerySchema>;
