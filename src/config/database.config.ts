import mongoose from 'mongoose';
import { env } from './env.config.js';
import logger from '../utils/logger.js';

const MAX_ATTEMPTS = 3;

export default async function connect() {
  for (let attempt = 0; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      await mongoose.connect(env.MONGODB_URI);
      logger.success('Successfully connected to database!');
      return;
    } catch (error) {
      if (attempt === 0) logger.error("Can't connect to database.");
      else logger.error(`Attempt ${attempt}/${MAX_ATTEMPTS} failed`, false);

      if (attempt < MAX_ATTEMPTS) {
        logger.wait(`Reconnecting (attempt ${attempt + 1}/${MAX_ATTEMPTS}) in 5 seconds...`);
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }

  logger.error(`Could not connect to database after ${MAX_ATTEMPTS} attempts`);
  process.exit(1);
}
