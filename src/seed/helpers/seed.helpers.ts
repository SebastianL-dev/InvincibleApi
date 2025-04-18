import chalk from "chalk";
import { Model } from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Cleans a MongoDB collection by deleting all documents within it.
 *
 * @template T - The type of the documents in the collection.
 * @param {T} model - The Mongoose model representing the collection to be cleaned.
 * @returns {Promise<void>} A promise that resolves once the collection has been successfully cleaned.
 */
export async function cleanCollection<T>(model: Model<T>): Promise<void> {
  console.log(chalk.black("  ◔ Cleaning collection..."));
  await model.deleteMany();
  console.log(chalk.green("  ✓"), "Succesfully collection cleaned");
}

/**
 * Insert MongoDB documents in the respective collection.
 *
 * @template T - The type of the documents in the collection.
 * @template S - The type of the normalized data to be inserted.
 * @param {T} model - The Mongoose model representing the collection.
 * @param {T[]} data - The documents list to be inserted in the collection.
 * @returns {Promise<void>} A promise that resolves once the collection has been successfully cleaned.
 */
export async function insertData<T, S>(
  model: Model<T>,
  data: S[]
): Promise<void> {
  console.log(chalk.black("  ◔ Inserting data..."));
  await model.insertMany(data);
  console.log(chalk.green("  ✓"), "Succesfully data inserted");
}

/**
 * Updates the JSON seed files with the new data from the MongoDB collections.
 *
 * @template T - The type of the documents in the collection.
 * @param {T} model - The Mongoose model representing the collection.
 * @param {string} filePath - The json file path to update the data.
 * @returns {Promise<void>} A promise that resolves once the collection has been successfully cleaned.
 */
export async function UpdateJsonFile<T>(
  model: Model<T>,
  filePath: string
): Promise<void> {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  console.log(chalk.black("  ◔ Updating json files..."));
  const items = await model.find().select("-updatedAt").lean();

  fs.writeFileSync(
    path.join(__dirname, `api/${filePath}`),
    JSON.stringify(items, null, 2),
    "utf-8"
  );

  console.log(chalk.green("  ✓"), "Succesfully json files updated");
}
