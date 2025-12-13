import Environment, {
  EnvironmentParsed,
} from "../interfaces/env/env.interface.js";
import { envScheme } from "../schemas/env/env.schema.js";
import dotenv from "dotenv";

dotenv.config();

const parsedEnv: Environment = envScheme.parse(process.env);

const {
  MONGO_URI: mongo_uri,
  PORT: port,
  REDIS_URL: redis_url,
}: Environment = parsedEnv;

export const EnvConfig = (): EnvironmentParsed => ({
  mongo_uri,
  port,
  redis_url,
});
