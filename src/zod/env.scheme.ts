import { z } from "zod";

const envScheme = z.object({
  MONGO_URI: z.string().min(5, "Invalid MongoDB URI"),
  // REDIS_URL: z.string().min(5, "Invalid Redis URL"),
});

export default envScheme;
