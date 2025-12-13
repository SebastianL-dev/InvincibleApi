import { z } from "zod";

export const envScheme = z.object({
  MONGO_URI: z.string().min(5),
  PORT: z.string().min(4),
  REDIS_URL: z.string().min(5),
});
