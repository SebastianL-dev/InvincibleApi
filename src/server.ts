import app from "./app.js";
import connect from "./config/db/db.config.js";
import chalk from "chalk";
import figlet from "figlet";
import { EnvConfig } from "./config/env.config.js";

/**
 * Main entry point to start the Express server.
 */

// Load enviroment variables - (port)
const env = EnvConfig();

// Start server
app
  .listen(env.port, () => {
    console.clear();

    const firstText = figlet.textSync("INVINCIBLE", {
      horizontalLayout: "default",
    });
    const lastText = figlet.textSync("API", { horizontalLayout: "default" });

    // Join both title parts
    const title = firstText
      .split("\n")
      .map((line, index) => {
        const secondLine = lastText.split("\n")[index];
        return chalk.blue(line) + chalk.black(secondLine);
      })
      .join("\n");

    console.log(title);
    console.log(chalk.gray("─".repeat(78)));

    // Aditional information
    console.log(chalk.blue("\n  ▶ Invincible API v0.0.1"));
    console.log(chalk.green("\n  ✓"), "Server running succesfully!");
    console.log(chalk.black(`  ○ Host: http://localhost:${env.port}`));
  })
  .on("error", (error: Error) => {
    console.log(chalk.red("\n   ✕"), `Oops, something went wrong: ${error}`);
  });

// Connect database
void connect();
