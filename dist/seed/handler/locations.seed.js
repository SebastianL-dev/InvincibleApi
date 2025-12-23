import fs from "fs";
import path from "path";
import chalk from "chalk";
import locationModel from "../../models/location.model.js";
let dirPath = "src/seed/data";
let fileName = "locations.json";
let pathName = path.join(dirPath, fileName);
export default async function seedLocations() {
    console.log(chalk.black("  ◔ Seeding locations collection..."));
    // Clear locations collection.
    await locationModel.deleteMany({});
    // Read seed json file and insert locations to database.
    const data = fs.readFileSync(pathName, "utf-8");
    const locations = JSON.parse(data);
    await locationModel.insertMany(locations);
}
