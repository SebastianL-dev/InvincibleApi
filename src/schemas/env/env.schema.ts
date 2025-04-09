import { z } from "zod";

/**
 * Schema definition for environment variables validation using Zod.
 */
export const envScheme = z.object({
  MONGO_URI: z.string().min(5),
  PORT: z.string().min(4),
});
