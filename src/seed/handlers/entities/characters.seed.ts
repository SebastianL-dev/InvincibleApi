import characterModel from "../../../models/entities/character.model.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import normalizeJson from "../../../utils/format/normalize.json.js";
import Character from "../../../interfaces/entities/character.interface.js";
import {
  cleanCollection,
  insertData,
  UpdateJsonFile,
} from "../../../seed/helpers/seed.helpers.js";
import { getFileHash } from "../../helpers/hashFile.helpers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const charactersPath =
  "../../../../src/seed/data/entities/characters.seed.json";
const hashFilePath = path.join(
  __dirname,
  "../../../../src/seed/data/hash/characters.hash"
);
const currentHash = getFileHash(path.join(__dirname, charactersPath));
let savedHash = "";

const charactersData: Character[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, charactersPath), "utf-8")
);

if (fs.existsSync(hashFilePath))
  savedHash = fs.readFileSync(hashFilePath, "utf-8").trim();

/**
 * Seeds the database with character data by performing the following steps:
 * 1. Cleans the existing character collection in the database.
 * 2. Normalizes and inserts new character data into the collection.
 * 3. Updates the JSON files with the newly inserted character data.
 *
 * @async
 * @function charactersSeed
 *
 * @throws {Error} Throws an error if any of the database operations or file writes fail.
 */
export default async function charactersSeed() {
  try {
    console.log(chalk.yellow("\n  ▶ Characters collection"));

    if (currentHash === savedHash) {
      console.log(
        chalk.gray("  ▶ No changes in characters collection. Skipping...")
      );

      return;
    }

    await cleanCollection(characterModel);
    const normalizedCharacters = normalizeJson(charactersData);

    await insertData(characterModel, normalizedCharacters);
    await UpdateJsonFile(characterModel, charactersPath);

    fs.writeFileSync(hashFilePath, currentHash);
  } catch (error) {
    const typedError = error as Error;

    console.error(chalk.red("  ✗ Error during seeding process:"), typedError);
    process.exit();
  }
}
