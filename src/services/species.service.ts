import Species from "../interfaces/entities/species.interface.js";
import speciesModel from "../models/entities/species.model.js";
import { speciesPopulateOptions } from "../populate/species.populate.js";
import { redisClient } from "../server.js";

export async function findAllSpecies(): Promise<Species[]> {
  const reply = await redisClient.get("species");

  if (reply) return JSON.parse(reply);

  const foundSpecies = await speciesModel
    .find()
    .select("-_id")
    .populate(speciesPopulateOptions)
    .sort({ id: 1 })
    .lean();
  await redisClient.set("species", JSON.stringify(foundSpecies));

  return foundSpecies;
}

export async function findSpeciesById(id: number): Promise<Species | null> {
  const reply = await redisClient.get(`species_${id}`);

  if (reply) return JSON.parse(reply);

  const foundSpecies = await speciesModel
    .findOne({ id: id })
    .select("-_id")
    .populate(speciesPopulateOptions)
    .sort({ id: 1 })
    .lean();

  await redisClient.set(`species_${id}`, JSON.stringify(foundSpecies));

  return foundSpecies;
}
