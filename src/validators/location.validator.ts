import z from 'zod';
import { LOCATION_STATUSES, LOCATION_TYPES } from '../models/location.model.js';

export const locationQuerySchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  type: z.enum(LOCATION_TYPES).optional(),
  status: z.enum(LOCATION_STATUSES).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export type LocationQuery = z.infer<typeof locationQuerySchema>;
