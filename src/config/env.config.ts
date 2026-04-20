import dotenv from 'dotenv';
import { EnvSchema } from '../validators/env.validator.js';
import logger from '../utils/console/logger.js';
import z from 'zod';

dotenv.config();

const result = EnvSchema.safeParse(process.env);

if (!result.success) {
  logger.error('Invalid environment variables!');

  console.log();
  console.error(z.prettifyError(result.error));
  process.exit(1);
}

export const env = result.data;
