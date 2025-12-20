import app from "./app.js";
import connect from "./config/db/db.config.js";
import chalk from "chalk";
import {
  printBanner,
  printServerInfo,
} from "./utils/console/prints.console.js";

const startServer = async () => {
  try {
    app.listen("8080");

    printBanner();
    printServerInfo();

    await connect();
  } catch (error) {
    const typedError = error as Error;

    console.log(chalk.red("\n   ✕"), "Oops, something went wrong: ");
    console.error(typedError);

    process.exit(1);
  }
};

startServer();
