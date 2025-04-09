import mongoose from "mongoose";
import chalk from "chalk";
import { EnvConfig } from "../env.config.js";

const env = EnvConfig();
const uri = env.mongo_uri;

const connect = async () => {
  try {
    await mongoose.connect(uri, {});

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

    setTimeout(() => {
      connect();
    }, 1500);
  }
};

export default connect;
