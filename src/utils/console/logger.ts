import chalk from 'chalk';

const logger = {
  error: (message: string, newLine: boolean = true, ...args: unknown[]) =>
    console.error(chalk.red(`${newLine ? '\n' : ''}✗`, message), ...args),

  warn: (message: string, newLine: boolean = true, ...args: unknown[]) =>
    console.warn(chalk.yellow(`${newLine ? '\n' : ''}⚠`, message), ...args),

  info: (message: string, newLine: boolean = true, ...args: unknown[]) =>
    console.log(chalk.blue(`${newLine ? '\n' : ''}▶`, message), ...args),

  wait: (message: string, newLine: boolean = true, ...args: unknown[]) =>
    console.log(chalk.gray(`${newLine ? '\n' : ''}◔`, message), ...args),

  success: (message: string, newLine: boolean = true, ...args: unknown[]) =>
    console.log(chalk.green(`${newLine ? '\n' : ''}✓`, message), ...args),
};

export default logger;
