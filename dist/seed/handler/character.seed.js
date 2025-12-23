import fs from "fs";
import path from "path";
import chalk from "chalk";
import characterModel from "../../models/character.model.js";
let dirPath = "src/seed/data";
let fileName = "characters.json";
let pathName = path.join(dirPath, fileName);
export default async function seedCharacters() {
    console.log(chalk.black("  ◔ Seeding characters collection..."));
    // Clear characters collection.
    await characterModel.deleteMany({});
    // Read seed json file and insert chaaracters to database.
    const data = fs.readFileSync(pathName, "utf-8");
    const characters = JSON.parse(data);
    await characterModel.insertMany(characters);
}
