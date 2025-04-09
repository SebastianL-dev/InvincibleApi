import { envScheme } from "../schemas/env/env.schema.js";
import dotenv from "dotenv";

dotenv.config();

const parsedEnv = envScheme.parse(process.env);

const { MONGO_URI: mongo_uri, PORT: port } = parsedEnv;

export const EnvConfig = () => ({
  mongo_uri,
  port,
});
