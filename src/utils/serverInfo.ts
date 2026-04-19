import chalk from 'chalk';
import { env } from '../config/env.config.js';

export default function ShowServerInfo() {
  console.log();
  console.log(chalk.blue('  ▶ Invincible API v0.0.1'));
  console.log(chalk.green('  ✓'), 'Server running successfully!');
  console.log(chalk.black(`  ○ Host: http://localhost:${env.PORT}`));
}
