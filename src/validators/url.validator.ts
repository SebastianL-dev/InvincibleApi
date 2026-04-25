import z from 'zod';

export const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type Params = z.infer<typeof paramsSchema>;
