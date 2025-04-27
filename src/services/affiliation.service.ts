import Affiliation from "../interfaces/entities/affiliation.interface.js";
import affiliationModel from "../models/entities/affiliation.model.js";
import { affiliationPopulateOptions } from "../populate/affiliation.populate.js";
import { redisClient } from "../server.js";

/**
 * Find a list of affiliations from the database.
 *
 * @async
 * @function findAllAffiliations
 * @returns {Promise<Affiliation[]>} A promise that resolves to a list of affiliations with populated fields.
 */
export async function findAllAffiliations(): Promise<Affiliation[]> {
  const reply = await redisClient.get("affiliations");

  if (reply) return JSON.parse(reply);

  const foundAffiliations = await affiliationModel
    .find()
    .select("-_id")
    .populate(affiliationPopulateOptions)
    .sort({ id: 1 })
    .lean();

  await redisClient.set("affiliations", JSON.stringify(foundAffiliations));

  return foundAffiliations;
}

/**
 * Find an affiliation from the database, searching by its unique identifier.
 *
 * @async
 * @function findAffiliationById
 * @param {number} id - The unique identifier of the affiliation to find.
 * @returns {Promise<Affiliation | null>} A promise that resolves an affiliation with populated fields.
 */
export async function findAffiliationById(id: number) {
  const reply = await redisClient.get(`affiliation_${id}`);

  if (reply) return JSON.parse(reply);

  const foundAffiliation = await affiliationModel
    .findOne({ id: id })
    .select("-_id")
    .populate(affiliationPopulateOptions)
    .sort({ id: 1 })
    .lean();

  await redisClient.set(`affiliation_${id}`, JSON.stringify(foundAffiliation));

  return foundAffiliation;
}
