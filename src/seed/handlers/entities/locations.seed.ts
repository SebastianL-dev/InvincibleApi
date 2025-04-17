import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import locationModel from "../../../models/entities/location.model.js";
import normalizeJson from "../../../utils/format/normalize.json.js";
import Location from "../../../interfaces/entities/location.interface.js";
import {
  cleanCollection,
  insertData,
  UpdateJsonFile,
} from "../../../seed/helpers/seed.helpers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const locationPath = "../../../../src/seed/data/entities/locations.seed.json";

const locationData: Location[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, locationPath), "utf-8")
);

/**
 * Seeds the database with locations data by performing the following steps:
 * 1. Cleans the existing location collection in the database.
 * 2. Normalizes and inserts new locations data into the collection.
 * 3. Updates the JSON files with the newly inserted locations data.
 *
 * @async
 * @function locationsSeed
 *
 * @throws {Error} Throws an error if any of the database operations or file writes fail.
 */
export default async function locationsSeed() {
  try {
    console.log(chalk.yellow("\n  ▶ Locations collection"));
    await cleanCollection(locationModel);
    const normalizedLocations = normalizeJson(locationData);

    await insertData(locationModel, normalizedLocations);
    await UpdateJsonFile(locationModel, locationPath);
  } catch (error) {
    const typedError = error as Error;

    console.error(chalk.red("  ✗ Error during seeding process:"), typedError);
    process.exit();
  }
}
