import z from 'zod';
import { CHARACTER_STATUSES } from '../models/character.model.js';

export const characterQuerySchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  status: z.enum(CHARACTER_STATUSES).optional(),
  gender: z.string().trim().min(1).max(50).optional(),
  species: z.coerce.number().int().positive().optional(),
  origin: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export type CharacterQuery = z.infer<typeof characterQuerySchema>;
