import speciesModel from "../models/species.model.js";

export async function findAllSpecies() {
  const foundSpecies = await speciesModel
    .find({})
    .select("-_id -createdAt -updatedAt -description -characteristics")
    .populate("home", "-_id id name ")
    .lean();

  return foundSpecies;
}

export async function findSpeciesById(id: number) {
  const foundSpecies = await speciesModel
    .findOne({ id })
    .select("-_id -createdAt -updatedAt")
    .populate("home", "-_id id name type status leader images")
    .lean();

  return foundSpecies;
}
