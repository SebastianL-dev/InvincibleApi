import Environment, {
  EnvironmentParsed,
} from "../interfaces/env/env.interface.js";
import { envScheme } from "../schemas/env/env.schema.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * Validated environment variables using zod schema.
 *
 * @constant parsedEnv
 * @type {Environment}
 */
const parsedEnv: Environment = envScheme.parse(process.env);

/**
 * Set the validated environment variables.
 *
 * @constant
 * @type {Environment}
 */
const {
  MONGO_URI: mongo_uri,
  PORT: port,
  REDIS_URL: redis_url,
}: Environment = parsedEnv;

/**
 * Generates the environment configuration object.
 *
 * @returns {{ mongo_uri: string, port: string, redis_url: string }} An object containing the parsed environment variables.
 * @property {string} mongo_uri - The URI for connecting to the MongoDB database.
 * @property {string} port - The port number to run the server.
 */
export const EnvConfig = (): EnvironmentParsed => ({
  mongo_uri,
  port,
  redis_url,
});
