import { speciesModel } from '../../src/models/species.model.js';
import { locationModel } from '../../src/models/location.model.js';
import logger from '../../src/utils/console/logger.js';

export async function deleteCollections() {
  logger.wait('Wiping all collections...');
  await Promise.all([speciesModel.deleteMany({}), locationModel.deleteMany({})]);
  console.log();
}
