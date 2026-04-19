import mongoose from 'mongoose';
import { env } from './env.config.js';

export default async function connect() {
  try {
    await mongoose.connect(env.MONGODB_URI, {});
  } catch (error) {
    console.error('Error connecting to database.');

    // TODO: implement 3 attemps to connect with database.
    // TODO: use chalk and fix log messages

    process.exit(1);
  }
}
