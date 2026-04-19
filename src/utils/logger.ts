import chalk from 'chalk';

const logger = {
  error: (message: string, jump: boolean = true, ...args: unknown[]) =>
    console.error(chalk.red(`${jump ? '\n' : ''}✗`, message), ...args),

  warn: (message: string, jump: boolean = true, ...args: unknown[]) =>
    console.warn(chalk.yellow(`${jump ? '\n' : ''}⚠`, message), ...args),

  info: (message: string, jump: boolean = true, ...args: unknown[]) =>
    console.log(chalk.blue(`${jump ? '\n' : ''}▶`, message), ...args),

  wait: (message: string, jump: boolean = true, ...args: unknown[]) =>
    console.log(chalk.black(`${jump ? '\n' : ''}◔`, message), ...args),

  success: (message: string, jump: boolean = true, ...args: unknown[]) =>
    console.log(chalk.green(`${jump ? '\n' : ''}✓`, message), ...args),
};

export default logger;
