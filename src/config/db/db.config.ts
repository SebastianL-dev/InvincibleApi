import mongoose from "mongoose";
import chalk from "chalk";
import { EnvConfig } from "../env.config.js";

// Load enviroment variables - (uri)
const env = EnvConfig();
const uri = env.mongo_uri;

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 *
 * @async
 * @function
 */
const connect = async () => {
  try {
    await mongoose.connect(uri, {});

    // Aditional information
    console.log(chalk.green("\n  ✓"), "Succesfully conected to database");
    console.log(
      chalk.black("  ▶ Remember visite our site: "),
      chalk.blue("https://")
    );
  } catch (error) {
    const typedError = error as Error;

    console.log(
      chalk.red("\n  ✕"),
      `Oops, something went wrong: \n  ${typedError}`
    );

    // Reconnect database on error
    setTimeout(() => {
      connect();
    }, 5000);
  }
};

export default connect;
