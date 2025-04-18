import Location from "../interfaces/entities/location.interface.js";
import locationModel from "../models/entities/location.model.js";
import { locationPopulateOptions } from "../populate/location.populate.js";
import { redisClient } from "../server.js";

/**
 * Find a list of location from the database.
 *
 * @async
 * @function findAllLocations
 * @returns {Promise<Location[]>} A promise that resolves to a list of locations.
 */
export async function findAllLocations(): Promise<Location[]> {
  const reply = await redisClient.get("locations");

  if (reply) return JSON.parse(reply);

  const foundLocations = await locationModel
    .find()
    .populate(locationPopulateOptions)
    .lean({ virtuals: true });

  await redisClient.set("locations", JSON.stringify(foundLocations));

  return foundLocations;
}

/**
 * Find a location from the database, searching by its unique identifier.
 *
 * @async
 * @function findLocationById
 * @param {number} id - The unique identifier of the episode to find.
 * @returns {Promise<Location | null>} A promise that resolves location.
 */
export async function findLocationById(id: number): Promise<Location | null> {
  const reply = await redisClient.get(`location_${id}`);

  if (reply) return JSON.parse(reply);

  const foundLocation = await locationModel
    .findOne({ id: id })
    .populate(locationPopulateOptions)
    .lean({ virtuals: true });

  await redisClient.set(`location_${id}`, JSON.stringify(foundLocation));

  return foundLocation;
}
