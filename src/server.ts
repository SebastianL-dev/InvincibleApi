import mongoose from 'mongoose';
import app from './app.js';
import connect from './config/database.config.js';
import { env } from './config/env.config.js';
import ShowBanner from './utils/console/banner.js';
import logger from './utils/console/logger.js';
import ShowServerInfo from './utils/console/serverInfo.js';

async function server() {
  try {
    ShowBanner();
    await connect();

    const server = app.listen(env.PORT, () => {
      ShowServerInfo();
      console.log();
    });

    for (const signal of ['SIGINT', 'SIGTERM'] as const) {
      process.on(signal, async () => {
        logger.info(`Shutting down server...`);
        server.close();
        await mongoose.disconnect();
        process.exit(0);
      });
    }
  } catch (error) {
    logger.error('Server startup failed!');
    console.log();
    console.error(error);

    process.exit(1);
  }
}

server();
