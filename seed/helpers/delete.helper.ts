import { speciesModel } from '../../src/models/species.model.js';
import { locationModel } from '../../src/models/location.model.js';
import { characterModel } from '../../src/models/character.model.js';
import { groupModel } from '../../src/models/group.model.js';
import { episodeModel } from '../../src/models/episode.model.js';
import logger from '../../src/utils/console/logger.js';

export async function deleteCollections() {
  logger.wait('Wiping all collections...');
  await Promise.all([
    speciesModel.deleteMany({}),
    locationModel.deleteMany({}),
    characterModel.deleteMany({}),
    groupModel.deleteMany({}),
    episodeModel.deleteMany({}),
  ]);
  console.log();
}
