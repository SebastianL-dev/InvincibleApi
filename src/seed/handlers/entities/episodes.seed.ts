import episodeModel from "../../../models/entities/episode.model.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import normalizeJson from "../../../utils/format/normalize.json.js";
import Episode from "../../../interfaces/entities/episode.interface.js";
import {
  cleanCollection,
  insertData,
  UpdateJsonFile,
} from "../../../seed/helpers/seed.helpers.js";
import { getFileHash } from "../../helpers/hashFile.helpers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const episodesPath = "../../../../src/seed/data/entities/episodes.seed.json";
const hashFilePath = path.join(
  __dirname,
  "../../../../src/seed/data/hash/episodes.hash"
);
const currentHash = getFileHash(path.join(__dirname, episodesPath));
let savedHash = "";

const episodesData: Episode[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, episodesPath), "utf-8")
);

/**
 * Seeds the database with episode data by performing the following steps:
 * 1. Cleans the existing episode collection in the database.
 * 2. Normalizes and inserts new episode data into the collection.
 * 3. Updates the JSON files with the newly inserted episode data.
 *
 * @async
 * @function episodesSeed
 *
 * @throws {Error} Throws an error if any of the database operations or file writes fail.
 */
export default async function episodesSeed() {
  try {
    console.log(chalk.yellow("\n  ▶ Episodes collection"));

    if (fs.existsSync(hashFilePath))
      savedHash = fs.readFileSync(hashFilePath, "utf-8").trim();

    if (currentHash === savedHash) {
      console.log(
        chalk.gray("  ▶ No changes in episodes collection. Skipping...")
      );

      return;
    }

    await cleanCollection(episodeModel);
    const normalizedEpisodes = normalizeJson(episodesData);

    await insertData(episodeModel, normalizedEpisodes);
    await UpdateJsonFile(episodeModel, episodesPath);

    fs.writeFileSync(hashFilePath, currentHash);
  } catch (error) {
    const typedError = error as Error;

    console.error(chalk.red("  ✗ Error during seeding process:"), typedError);
    process.exit();
  }
}
