import mongoose from 'mongoose';
import chalk from 'chalk';
import connect from '../src/config/database.config.js';
import { speciesModel } from '../src/models/species.model.js';
import logger from '../src/utils/console/logger.js';
import ShowBanner from '../src/utils/console/banner.js';
import speciesData from './data/species.json' with { type: 'json' };
import locationsData from './data/locations.json' with { type: 'json' };
import charactersData from './data/characters.json' with { type: 'json' };
import { deleteCollections } from './helpers/delete.helper.js';
import { insertCollection } from './helpers/insert.helper.js';
import { locationModel } from '../src/models/location.model.js';
import { characterModel } from '../src/models/character.model.js';

async function seed() {
  ShowBanner();

  try {
    await connect();
    await deleteCollections();

    const species = await insertCollection(speciesModel, speciesData, 'species');
    const locations = await insertCollection(locationModel, locationsData, 'locations');
    const characters = await insertCollection(characterModel, charactersData, 'characters');

    logger.done(
      `Seed complete: ${chalk.blue(species)} species, ${chalk.blue(locations)} locations, ${chalk.blue(characters)} characters`,
    );
  } catch (error) {
    logger.error('Database seed failed!');
    console.log();

    console.error(error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
