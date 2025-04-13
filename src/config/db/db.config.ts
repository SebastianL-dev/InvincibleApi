import mongoose from "mongoose";
import chalk from "chalk";
import { EnvConfig } from "../env.config.js";
import { performance } from "node:perf_hooks";
import { startTime } from "../../app.js";
import startUpTimeFormat from "../../utils/format/startUpTime.format.js";

/**
 * Get the environment variables and URI for connecting to the MongoDB database.
 */
const env = EnvConfig();
const uri = env.mongo_uri;

/**
 * Connect the app with the MongoDB database using mongoose.
 * On error, show a message and retry the connection.
 *
 * @async
 * @function connect
 */
const connect = async () => {
  try {
    await mongoose.connect(uri, {});

    console.log(chalk.green("\n  ✓"), "Succesfully conected to database");
    console.log(
      chalk.green("  ✓"),
      `Ready in ${startUpTimeFormat(performance.now() - startTime)}`
    );
    console.log(
      chalk.black("  ▶ Remember visite our site: "),
      chalk.blue("https://")
    );
  } catch (error) {
    const typedError = error as Error;

    console.log(chalk.red("\n  ✕"), "Oops, something went wrong: ");
    console.error(typedError);

    console.log(chalk.black("\n  ◔ Reconnecting..."));

    setTimeout(() => {
      connect();
    }, 5000);
  }
};

export default connect;
