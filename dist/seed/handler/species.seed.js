import fs from "fs";
import path from "path";
import chalk from "chalk";
import speciesModel from "../../models/species.model.js";
let dirPath = "src/seed/data";
let fileName = "species.json";
let pathName = path.join(dirPath, fileName);
export default async function seedSpecies() {
    console.log(chalk.black("  ◔ Seeding species collection..."));
    // Clear species collection.
    await speciesModel.deleteMany({});
    // Read seed json file and insert species to database.
    const data = fs.readFileSync(pathName, "utf-8");
    const species = JSON.parse(data);
    await speciesModel.insertMany(species);
}
