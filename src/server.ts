import app from './app.js';
import connect from './config/database.config.js';
import { env } from './config/env.config.js';
import ShowBanner from './utils/banner.js';
import logger from './utils/logger.js';
import ShowServerInfo from './utils/serverInfo.js';

async function server() {
  try {
    ShowBanner();

    await connect();
    app.listen(env.PORT);

    ShowServerInfo();
    console.log();
  } catch (error) {
    logger.error('Server startup failed!');
    console.log();
    console.error(error);

    process.exit(1);
  }
}

server();
