import { NextFunction, Request, Response } from "express";
import * as services from "../services/location.service.js";
import { NotFoundError } from "../utils/errors/custom/client.errors.js";
import Location, {
  PopulatedLocation,
} from "../interfaces/entities/location.interface.js";
import formatLocation from "../utils/format/cleanLocations.format.js";

export async function getAllLocations(
  req: Request,
  res: Response<Location[]>,
  next: NextFunction
): Promise<void> {
  try {
    const locations = await services.findAllLocations();

    if (!locations || locations.length === 0)
      throw new NotFoundError("No locations found");

    const cleanLocations = (locations as PopulatedLocation[]).map(
      formatLocation
    );

    res.status(200).json(cleanLocations);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}

export async function getLocationById(
  req: Request,
  res: Response<Location>,
  next: NextFunction
): Promise<void> {
  try {
    const id = req.params.id;
    const location = await services.findLocationById(parseInt(id));

    if (!location) throw new NotFoundError("No location found");

    const cleanLocation = formatLocation(location as PopulatedLocation);

    res.status(200).json(cleanLocation);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}
