import { envScheme } from "../schemas/env/env.schema.js";
import dotenv from "dotenv";

// Enviroment variables configuration
dotenv.config();

// Validate all enviroment variables
const parsedEnv = envScheme.parse(process.env);

const { MONGO_URI: mongo_uri, PORT: port } = parsedEnv;

// Provides the environment configuration for the application.
export const EnvConfig = () => ({
  mongo_uri,
  port,
});
