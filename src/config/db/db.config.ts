import mongoose from "mongoose";
import chalk from "chalk";
import { EnvConfig } from "../env.config.js";
import { startTime } from "../../app.js";
import { printExecutionInfo } from "../../utils/console/prints.console.js";

const env = EnvConfig();
const uri = env.mongo_uri;

const connect = async () => {
  try {
    await mongoose.connect(uri, {});

    console.log(chalk.green("\n  ✓"), "Succesfully conected to database");

    // Show time taken in connect to database and start the server.
    printExecutionInfo(startTime);
  } catch (error) {
    const typedError = error as Error;

    console.log(chalk.red("\n  ✕"), "Oops, can't connect to database: ");
    console.error(typedError);

    // Try 3 times to connect to database.
    for (let i = 0; i <= 3; i++) {
      console.log(chalk.black("\n  ◔ Reconnecting in 5 seconds..."));

      setTimeout(() => {
        connect();
      }, 5000);
    }

    process.exit(1);
  }
};

export default connect;
