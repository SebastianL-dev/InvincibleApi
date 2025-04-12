import app from "./app.js";
import connect from "./config/db/db.config.js";
import chalk from "chalk";
import { EnvConfig } from "./config/env.config.js";
import { createClient } from "redis";
import {
  printBanner,
  printServerInfo,
} from "./utils/console/prints.console.js";

/**
 * Entry point of the Invincible API server.
 * Sets up environment, database, and starts the Express app.
 */
const env = EnvConfig();

const redisUrl =
  process.env.NODE_ENV === "production"
    ? env.redis_url
    : "redis://localhost:6379";

export const redisClient = createClient({
  url: redisUrl,
});

/**
 * Initialize redis client and Express server.
 *
 * @async
 * @function startServer
 */
const startServer = async () => {
  try {
    await redisClient.connect();
    app.listen(env.port);

    printBanner();
    printServerInfo();
  } catch (error) {
    const typedError = error as Error;

    console.log(
      chalk.red("\n   ✕"),
      `Oops, something went wrong: ${typedError}`
    );

    process.exit(0);
  }
};

startServer();
void connect();
