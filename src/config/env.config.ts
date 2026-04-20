import dotenv from 'dotenv';
import { EnvSchema } from '../validators/env.validator.js';
import logger from '../utils/logger.js';
import z from 'zod';

dotenv.config();

const result = EnvSchema.safeParse(process.env);

if (!result.success) {
  logger.error('Invalid environment variables!');

  console.log();
  z.prettifyError(result.error);
  process.exit(1);
}

export const env = result.data;
