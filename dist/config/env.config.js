import dotenv from "dotenv";
import envScheme from "../zod/env.scheme.js";
dotenv.config();
// Verify if environment variables are valid.
const { MONGO_URI: mongo_uri } = envScheme.parse(process.env);
export const EnvConfig = () => ({
    mongo_uri,
});
