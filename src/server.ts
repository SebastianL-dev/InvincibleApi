import app from './app.js';
import connect from './config/database.config.js';
import { env } from './config/env.config.js';
import ShowBanner from './utils/banner.js';
import logger from './utils/logger.js';
import ShowServerInfo from './utils/serverInfo.js';

async function server() {
  try {
    console.clear();
    app.listen(env.PORT);

    ShowBanner();
    ShowServerInfo();

    await connect();
  } catch (error) {
    logger.error('Server startup failed!');
    console.error(error);

    process.exit(1);
  }
}

server();
