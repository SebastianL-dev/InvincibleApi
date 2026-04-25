import z from 'zod';
import { SPECIES_STATUSES } from '../models/species.model.js';

export const speciesQuerySchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  status: z.enum(SPECIES_STATUSES).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export type SpeciesQuery = z.infer<typeof speciesQuerySchema>;
