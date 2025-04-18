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
import { getFileHash } from "../../helpers/hashFile.helpers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const locationPath = "../../../../src/seed/data/entities/locations.seed.json";
const hashFilePath = path.join(
  __dirname,
  "../../../../src/seed/data/hash/locations.hash"
);
const currentHash = getFileHash(path.join(__dirname, locationPath));
let savedHash = "";

const locationData: Location[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, locationPath), "utf-8")
);

if (fs.existsSync(hashFilePath))
  savedHash = fs.readFileSync(hashFilePath, "utf-8").trim();

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

    if (currentHash === savedHash) {
      console.log(
        chalk.gray("  ▶ No changes in locations collection. Skipping...")
      );

      return;
    }

    await cleanCollection(locationModel);
    const normalizedLocations = normalizeJson(locationData);

    await insertData(locationModel, normalizedLocations);
    await UpdateJsonFile(locationModel, locationPath);

    fs.writeFileSync(hashFilePath, currentHash);
  } catch (error) {
    const typedError = error as Error;

    console.error(chalk.red("  ✗ Error during seeding process:"), typedError);
    process.exit();
  }
}
