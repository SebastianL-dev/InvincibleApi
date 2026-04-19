import chalk from 'chalk';

const invincible = String.raw`
  ___ _   ___     _____ _   _  ____ ___ ____  _     _____ 
 |_ _| \ | \ \   / /_ _| \ | |/ ___|_ _| __ )| |   | ____|
  | ||  \| |\ \ / / | ||  \| | |    | ||  _ \| |   |  _|  
  | || |\  | \ V /  | || |\  | |___ | || |_) | |___| |___ 
 |___|_| \_|  \_/  |___|_| \_|\____|___|____/|_____|_____|`.split('\n');

const api = String.raw`
    _    ____ ___ 
   / \  |  _ \_ _|
  / _ \ | |_) | | 
 / ___ \|  __/| | 
/_/   \_\_|  |___| `.split('\n');

export default function ShowBanner() {
  const result = invincible
    .map((line, index) => line.padEnd(60) + chalk.blue(api[index] ?? ''))
    .join('\n');

  console.log(result);
  console.log(chalk.gray('─'.repeat(79)));
}
