import { NextFunction, Request, Response } from "express";
import * as services from "../services/affiliation.service.js";
import { NotFoundError } from "../utils/errors/custom/client.errors.js";
import { PopulatedAffiliation } from "../interfaces/entities/affiliation.interface.js";
import {
  formatAffiliation,
  formatAffiliations,
} from "../utils/format/cleanAffiliations.format.js";

/**
 * Endpoint to handle the HTTP GET request to retrieve all affiliations.
 *
 * @async
 * @function getAllAffiliations
 * @param {Request} req - HTTP request object.
 * @param {Response<PopulatedAffiliation[]>} res - HTTP response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A JSON response containing the list of affiliations or an error message.
 *
 * @throws {NotFoundError} If the affiliation list is empty or null.
 * @throws {Error} For any other unexpected errors during execution.
 */
export async function getAllAffiliations(
  req: Request,
  res: Response<PopulatedAffiliation[]>,
  next: NextFunction
): Promise<void> {
  try {
    const affiliations = await services.findAllAffiliations();

    if (!affiliations || affiliations.length === 0)
      throw new NotFoundError("No affiliations found");

    const cleanAffiliations = formatAffiliations(affiliations);

    res.status(200).json(cleanAffiliations);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}

/**
 * Endpoint to handle the HTTP GET request to retrieve one affiliation
 * searching by its unique identifier.
 *
 * @async
 * @function getAffiliationById
 * @param {Request} req - HTTP request object.
 * @param {Response<Affiliation>} res - HTTP response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A JSON response containing the affiliation found or an error message.
 *
 * @throws {NotFoundError} If the affiliation with the specified ID is not found.
 * @throws {Error} For any other unexpected errors during execution.
 */
export async function getAffiliationById(
  req: Request,
  res: Response<PopulatedAffiliation>,
  next: NextFunction
): Promise<void> {
  try {
    const id = req.params.id;

    const affiliation = await services.findAffiliationById(parseInt(id));

    if (!affiliation) throw new NotFoundError("No affiliation found");

    const cleanAffiliation = formatAffiliation(affiliation);

    res.status(200).json(cleanAffiliation);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}
