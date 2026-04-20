import z from 'zod';

export const locationParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type LocationParams = z.infer<typeof locationParamsSchema>;
