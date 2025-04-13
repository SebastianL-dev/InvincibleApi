import mongoose from "mongoose";
import startUpTimeFormat from "../utils/format/startUpTime.format.js";
import chalk from "chalk";
import { EnvConfig } from "../config/env.config.js";
import { performance } from "perf_hooks";
import charactersSeed from "./handlers/entities/characters.seed.js";

const env = EnvConfig();

/**
 * This function connects to the MongoDB database using the URI specified in the environment
 * variables, clears the console, and logs the progress of the seeding process. It also measures
 * the time taken to complete the operation and handles any errors that occur during the process.
 *
 * @async
 * @function
 * @throws {Error} If there is an issue connecting to the database or during the seeding process.
 */
const seedDatabase = async () => {
  try {
    const startTime = performance.now();
    console.clear();

    console.log(chalk.blue("  ▶ Seeding database..."));

    process.stdout.write(chalk.black("\n  ◔ Connecting to database..."));
    await mongoose.connect(env.mongo_uri);
    process.stdout.write("\r");
    console.log(chalk.green("  ✓"), "Succesfully conected to database");

    await charactersSeed();

    console.log(
      chalk.green("\n  ✓"),
      `Database seeded in ${startUpTimeFormat(performance.now() - startTime)}`
    );

    process.exit();
  } catch (error) {
    const typedError = error as Error;

    console.log(chalk.red("\n   ✕"), "Oops, something went wrong: ");
    console.error(typedError);

    process.exit();
  }
};

seedDatabase();
