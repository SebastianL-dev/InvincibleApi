import { NextFunction, Request, Response } from "express";
import * as services from "../services/species.service.js";
import { NotFoundError } from "../utils/errors/custom/client.errors.js";
import { PopulatedSpecies } from "../interfaces/entities/species.interface.js";
import {
  formatSpecies,
  formatSingleSpecies,
} from "../utils/format/cleanSpecies.format.js";

/**
 * Endpoint to handle the HTTP GET request to retrieve all species.
 *
 * @async
 * @function getAllSpecies
 * @param {Request} req - HTTP request object.
 * @param {Response<PopulatedSpecies[]>} res - HTTP response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A JSON response containing the list of species or an error message.
 *
 * @throws {NotFoundError} If the episode list is empty or null.
 * @throws {Error} For any other unexpected errors during execution.
 */
export async function getAllSpecies(
  req: Request,
  res: Response<PopulatedSpecies[]>,
  next: NextFunction
): Promise<void> {
  try {
    const species = await services.findAllSpecies();

    if (!species || species.length === 0)
      throw new NotFoundError("No species found");

    const cleanSpecies = formatSpecies(species);

    res.status(200).json(cleanSpecies);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}

/**
 * Endpoint to handle the HTTP GET request to retrieve one species
 * searching by its unique identifier.
 *
 * @async
 * @function getSpeciesById
 * @param {Request} req - HTTP request object.
 * @param {Response<Species>} res - HTTP response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A JSON response containing the species found or an error message.
 *
 * @throws {NotFoundError} If the species with the specified ID is not found.
 * @throws {Error} For any other unexpected errors during execution.
 */
export async function getSpeciesById(
  req: Request,
  res: Response<PopulatedSpecies>,
  next: NextFunction
): Promise<void> {
  try {
    const id = req.params.id;

    const species = await services.findSpeciesById(parseInt(id));

    if (!species) throw new NotFoundError("No species found");

    const cleanSpecies = formatSingleSpecies(species);

    res.status(200).json(cleanSpecies);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}
