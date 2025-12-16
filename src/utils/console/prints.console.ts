import chalk from "chalk";
import figlet from "figlet";

export function printBanner() {
  console.clear();

  const firstText = figlet.textSync("INVINCIBLE", {
    horizontalLayout: "default",
  });
  const lastText = figlet.textSync("API", { horizontalLayout: "default" });

  const title = firstText
    .split("\n")
    .map((line, index) => {
      const secondLine = lastText.split("\n")[index];
      return chalk.blue(line) + chalk.black(secondLine);
    })
    .join("\n");

  console.log(title);
  console.log(chalk.gray("─".repeat(78)));
}

export function printServerInfo() {
  console.log(chalk.blue("\n  ▶ Invincible API v0.0.1"));
  console.log(chalk.green("\n  ✓"), "Server running succesfully!");
  console.log(chalk.black(`  ○ Host: http://localhost:8080`));
}
