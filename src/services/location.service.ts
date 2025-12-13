import Location from "../interfaces/entities/location.interface.js";
import locationModel from "../models/entities/location.model.js";
import { locationPopulateOptions } from "../populate/location.populate.js";
import { redisClient } from "../server.js";

export async function findAllLocations(): Promise<Location[]> {
  const reply = await redisClient.get("locations");

  if (reply) return JSON.parse(reply);

  const foundLocations = await locationModel
    .find()
    .populate(locationPopulateOptions)
    .sort({ id: 1 })
    .lean({ virtuals: true });

  await redisClient.set("locations", JSON.stringify(foundLocations));

  return foundLocations;
}

export async function findLocationById(id: number): Promise<Location | null> {
  const reply = await redisClient.get(`location_${id}`);

  if (reply) return JSON.parse(reply);

  const foundLocation = await locationModel
    .findOne({ id: id })
    .populate(locationPopulateOptions)
    .sort({ id: 1 })
    .lean({ virtuals: true });

  await redisClient.set(`location_${id}`, JSON.stringify(foundLocation));

  return foundLocation;
}
