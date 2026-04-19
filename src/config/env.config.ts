import dotenv from 'dotenv';
import { Env, EnvSchema } from '../validators/env.validator.js';
import logger from '../utils/logger.js';

dotenv.config();

const result = EnvSchema.safeParse(process.env);

if (!result.success) {
  console.clear();
  logger.error('Invalid environment variables!');

  console.log();
  console.error(result.error);
  process.exit(1);
}

export const env: Env = result.data;
