import Species from "../interfaces/entities/species.interface.js";
import speciesModel from "../models/entities/species.model.js";
import { speciesPopulateOptions } from "../populate/species.populate.js";
import { redisClient } from "../server.js";

/**
 * Find a list of species from the database.
 *
 * @async
 * @function findAllSpecies
 * @returns {Promise<Species[]>} A promise that resolves to a list of species.
 */
export async function findAllSpecies(): Promise<Species[]> {
  const reply = await redisClient.get("species");

  if (reply) return JSON.parse(reply);

  const foundSpecies = await speciesModel
    .find()
    .select("-_id")
    .populate(speciesPopulateOptions)
    .lean();
  await redisClient.set("species", JSON.stringify(foundSpecies));

  return foundSpecies;
}

/**
 * Find an species from the database, searching by its unique identifier.
 *
 * @async
 * @function findSpeciesById
 * @param {number} id - The unique identifier of the species to find.
 * @returns {Promise<Species | null>} A promise that resolves species.
 */
export async function findSpeciesById(id: number): Promise<Species | null> {
  const reply = await redisClient.get(`species_${id}`);

  if (reply) return JSON.parse(reply);

  const foundSpecies = await speciesModel
    .findOne({ id: id })
    .select("-_id")
    .populate(speciesPopulateOptions)
    .lean();

  await redisClient.set(`species_${id}`, JSON.stringify(foundSpecies));

  return foundSpecies;
}
