import { NextFunction, Request, Response } from "express";
import * as services from "../services/location.service.js";
import { NotFoundError } from "../utils/errors/custom/client.errors.js";
import Location, {
  PopulatedLocation,
} from "../interfaces/entities/location.interface.js";

/**
 * Endpoint to handle the HTTP GET request to retrieve all locations.
 *
 * @async
 * @function getAllLocations
 * @param {Request} req - HTTP request object.
 * @param {Response<Location[]>} res - HTTP response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A JSON response containing the list of locations or an error message.
 *
 * @throws {NotFoundError} If the location list is empty or null.
 * @throws {Error} For any other unexpected errors during execution.
 */
export async function getAllLocations(
  req: Request,
  res: Response<Location[]>,
  next: NextFunction
): Promise<void> {
  try {
    const locations = await services.findAllLocations();

    if (!locations || locations.length === 0)
      throw new NotFoundError("No locations found");

    const cleanedLocations = (locations as PopulatedLocation[]).map(
      ({ inhabitants, images, createdAt, updatedAt, ...rest }) => {
        if (!inhabitants)
          return { ...rest, inhabitants: [], images, createdAt, updatedAt };

        const cleanInhabitants = inhabitants.map(
          (inhabitant) => inhabitant.name
        );

        return {
          ...rest,
          inhabitants: cleanInhabitants,
          images,
          createdAt,
          updatedAt,
        };
      }
    );

    res.status(200).json(cleanedLocations);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}

/**
 * Endpoint to handle the HTTP GET request to retrieve one location
 * searching by its unique identifier.
 *
 * @async
 * @function getLocationById
 * @param {Request} req - HTTP request object.
 * @param {Response<Location>} res - HTTP response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A JSON response containing the location found or an error message.
 *
 * @throws {NotFoundError} If the location with the specified ID is not found.
 * @throws {Error} For any other unexpected errors during execution.
 */
export async function getLocationById(
  req: Request,
  res: Response<Location>,
  next: NextFunction
): Promise<void> {
  try {
    const id = req.params.id;
    const location = await services.findLocationById(parseInt(id));

    if (!location) throw new NotFoundError("No location found");

    const { inhabitants, images, createdAt, updatedAt, ...rest } =
      location as PopulatedLocation;

    const formattedLocation = {
      ...rest,
      inhabitants: inhabitants?.map((inhabitant) => inhabitant.name),
      images,
      createdAt,
      updatedAt,
    };

    res.status(200).json(formattedLocation);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}
