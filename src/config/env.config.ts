import dotenv from 'dotenv';
import { Env, EnvSchema } from '../validators/env.validator.js';
import logger from '../utils/logger.js';

dotenv.config();

const result = EnvSchema.safeParse(process.env);

if (!result.success) {
  logger.error('Invalid environment variables!');
  process.exit(1);
}

export const env: Env = result.data;
