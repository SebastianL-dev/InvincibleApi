import characterModel from "../../../models/entities/character.model.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import normalizeCharacter from "../../../utils/format/normalize.json.js";
import Character from "../../../interfaces/entities/character.interface.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const charactersData: Character[] = JSON.parse(
  fs.readFileSync(
    path.join(
      __dirname,
      "../../../../src/seed/data/entities/characters.seed.json"
    ),
    "utf-8"
  )
);

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
  process.stdout.write(chalk.black("  ◔ Cleaning collection..."));
  await characterModel.deleteMany();
  process.stdout.write("\r");
  console.log(chalk.green("  ✓"), "Succesfully collection cleaned");

  const normalizedCharacters = normalizeCharacter(charactersData);

  process.stdout.write(chalk.black("  ◔ Inserting data..."));
  await characterModel.insertMany(normalizedCharacters);
  process.stdout.write("\r");
  console.log(chalk.green("  ✓"), "Succesfully data inserted");

  process.stdout.write(chalk.black("  ◔ Updating json files..."));
  const characters = await characterModel.find();
  fs.writeFileSync(
    path.join(
      __dirname,
      "../../../../src/seed/data/entities/characters.seed.json"
    ),
    JSON.stringify(characters, null, 2),
    "utf-8"
  );
  process.stdout.write("\r");
  console.log(chalk.green("  ✓"), "Succesfully json files updated");
}
