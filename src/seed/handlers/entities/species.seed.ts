import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import speciesModel from "../../../models/entities/species.model.js";
import normalizeJson from "../../../utils/format/normalize.json.js";
import Species from "../../../interfaces/entities/species.interface.js";
import {
  cleanCollection,
  insertData,
  UpdateJsonFile,
} from "../../../seed/helpers/seed.helpers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const speciesPath = "../../../../src/seed/data/entities/species.seed.json";

const speciesData: Species[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, speciesPath), "utf-8")
);

/**
 * Seeds the database with species data by performing the following steps:
 * 1. Cleans the existing species collection in the database.
 * 2. Normalizes and inserts new species data into the collection.
 * 3. Updates the JSON files with the newly inserted species data.
 *
 * @async
 * @function speciesSeed
 *
 * @throws {Error} Throws an error if any of the database operations or file writes fail.
 */
export default async function speciesSeed() {
  try {
    console.log(chalk.yellow("\n  ▶ Species collection"));
    await cleanCollection(speciesModel);
    const normalizedSpecies = normalizeJson(speciesData);

    await insertData(speciesModel, normalizedSpecies);
    await UpdateJsonFile(speciesModel, speciesPath);
  } catch (error) {
    const typedError = error as Error;

    console.error(chalk.red("  ✗ Error during seeding process:"), typedError);
    process.exit();
  }
}
