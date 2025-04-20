import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import normalizeJson from "../../../utils/format/normalize.json.js";
import affiliationModel from "../../../models/entities/affiliation.model.js";
import {
  cleanCollection,
  insertData,
  UpdateJsonFile,
} from "../../helpers/seed.helpers.js";
import { getFileHash } from "../../helpers/hashFile.helpers.js";
import Affiliation from "../../../interfaces/entities/affiliation.interface.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const affiliationsPath =
  "../../../../src/seed/data/entities/affiliations.seed.json";
const hashFilePath = path.join(
  __dirname,
  "../../../../src/seed/data/hash/affiliations.hash"
);
const currentHash = getFileHash(path.join(__dirname, affiliationsPath));
let savedHash = "";

const affiliationsData: Affiliation[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, affiliationsPath), "utf-8")
);

if (fs.existsSync(hashFilePath))
  savedHash = fs.readFileSync(hashFilePath, "utf-8").trim();

/**
 * Seeds the database with affiliation data by performing the following steps:
 * 1. Cleans the existing affiliations collection in the database.
 * 2. Normalizes and inserts new affiliation data into the collection.
 * 3. Updates the JSON files with the newly inserted affiliation data.
 *
 * @async
 * @function affiliationsSeed
 *
 * @throws {Error} Throws an error if any of the database operations or file writes fail.
 */
export default async function affiliationsSeed() {
  try {
    console.log(chalk.yellow("\n  ▶ Affiliations collection"));

    if (currentHash === savedHash) {
      console.log(
        chalk.gray("  ▶ No changes in affiliations collection. Skipping...")
      );

      return;
    }

    await cleanCollection(affiliationModel);
    const normalizedAffiliations = normalizeJson(affiliationsData);

    await insertData(affiliationModel, normalizedAffiliations);
    await UpdateJsonFile(affiliationModel, affiliationsPath);

    fs.writeFileSync(hashFilePath, currentHash);
  } catch (error) {
    const typedError = error as Error;

    console.error(chalk.red("  ✗ Error during seeding process:"), typedError);
    process.exit();
  }
}
