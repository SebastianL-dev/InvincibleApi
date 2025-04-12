import { NextFunction, Request, Response } from "express";
import * as services from "../services/character.service.js";
import { NotFoundError } from "../utils/errors/custom/client.errors.js";

/**
 * Endpoint to handle the HTTP GET request to retrieve all characters.
 *
 * @param {Request} req - HTTP request object.
 * @param {Response} res - HTTP response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A JSON response containing the list of characters or an error message.
 *
 * @throws Will return a 500 status code with an error message if an exception occurs.
 */
export async function getAllCharacters(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const charactersFound = await services.findAllCharacters();

    if (!charactersFound) throw new NotFoundError("No characters found");

    res.status(200).json(charactersFound);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}
