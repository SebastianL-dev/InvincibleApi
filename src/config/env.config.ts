import dotenv from "dotenv";
import envScheme from "../zod/env.scheme.js";

dotenv.config();

// Verify if environment variables are valid.
const { MONGO_URI: mongo_uri, REDIS_URL: redis_url } = envScheme.parse(
  process.env
);

export const EnvConfig = () => ({
  mongo_uri,
  redis_url,
});
