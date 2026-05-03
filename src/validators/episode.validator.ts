import z from 'zod';

export const episodeQuerySchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  season: z.coerce.number().int().positive().optional(),
  episode: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export type EpisodeQuery = z.infer<typeof episodeQuerySchema>;
