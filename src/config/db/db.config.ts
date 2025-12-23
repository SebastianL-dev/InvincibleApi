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
    console.log(chalk.red("\n  ✕ Oops, can't connect to database: "));

    // Try 3 times to connect to database.
    for (let i = 1; i <= 3; i++) {
      console.log(
        chalk.black(`  ◔ Reconnecting (attempt ${i}/3) in 5 seconds...`)
      );

      await new Promise((resolve) => setTimeout(resolve, 5000));

      // Retry connection to database
      try {
        await mongoose.connect(uri, {});

        console.log(chalk.green("\n  ✓"), "Succesfully conected to database");
        printExecutionInfo(startTime);

        return; // Exit if successful
      } catch (retryError) {
        console.log(chalk.red(`\n  ✕ Attempt ${i}/3 failed`));

        if (i === 3) {
          console.error(retryError);
          process.exit(1);
        }
      }
    }

    process.exit(1);
  }
};

export default connect;
