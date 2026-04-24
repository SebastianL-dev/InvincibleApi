import z from 'zod';

export const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(8080),
  MONGODB_URI: z.url(),
  BASE_URL: z.url(),
});

export type Env = z.infer<typeof EnvSchema>;
