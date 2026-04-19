import app from './app.js';
import connect from './config/database.config.js';
import { env } from './config/env.config.js';

async function server() {
  try {
    await connect();

    app.listen(env.PORT);
  } catch (error) {
    console.error('Cant start server');
    process.exit(1);
  }
}

server();
