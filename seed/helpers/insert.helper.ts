import mongoose from 'mongoose';
import logger from '../../src/utils/console/logger.js';

export async function insertCollection<T>(
  model: mongoose.Model<T, unknown, unknown, unknown, unknown>,
  data: readonly unknown[],
  name: string,
) {
  logger.wait(`Inserting ${data.length} ${name}...`, false);

  const result = await model.insertMany(data as T[]);

  return result.length;
}
