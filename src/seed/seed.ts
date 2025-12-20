import mongoose from "mongoose";
import { EnvConfig } from "../config/env.config.js";
import { performance } from "perf_hooks";
import chalk from "chalk";
import { printExecutionInfo } from "../utils/console/prints.console.js";
import seedCharacters from "./handler/character.seed.js";
import seedLocations from "./handler/locations.seed.js";
import seedSpecies from "./handler/species.seed.js";

const env = EnvConfig();
const uri = env.mongo_uri;

async function seed() {
  const startTime = performance.now();

  await mongoose.connect(uri, {});
  console.log(chalk.green("\n  ✓"), "Succesfully conected to database\n");

  // Seed all collections.
  await seedCharacters();
  await seedLocations();
  await seedSpecies();

  // Show time taken to seed database.
  printExecutionInfo(startTime);

  process.exit(0);
}

seed();
