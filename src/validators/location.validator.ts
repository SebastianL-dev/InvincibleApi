import z from 'zod';
import { LOCATION_STATUSES, LOCATION_TYPES } from '../models/location.model.js';

export const locationParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const locationQuerySchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  type: z.enum(LOCATION_TYPES).optional(),
  status: z.enum(LOCATION_STATUSES).optional(),
});

export type LocationParams = z.infer<typeof locationParamsSchema>;
export type LocationQuery = z.infer<typeof locationQuerySchema>;
