import chalk from 'chalk';
import { env } from '../../config/env.config.js';

import pkg from '../../../package.json' with { type: 'json' };

export default function ShowServerInfo() {
  console.log();
  console.log(chalk.blue(`▶ Invincible API v${pkg.version}`));
  console.log(chalk.green('✓'), 'Server running successfully!');
  console.log(chalk.gray(`○ Host: http://localhost:${env.PORT}`));
}
