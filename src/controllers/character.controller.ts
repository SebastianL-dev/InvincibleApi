import { NextFunction, Request, Response } from "express";
import * as services from "../services/character.service.js";
import { NotFoundError } from "../utils/errors/custom/client.errors.js";
import { PopulatedCharacter } from "../interfaces/entities/character.interface.js";
import {
  formatCharacter,
  formatCharacters,
} from "../utils/format/cleanCharacters.format.js";

/**
 * Endpoint to handle the HTTP GET request to retrieve all characters.
 *
 * @async
 * @function getAllCharacters
 * @param {Request} req - HTTP request object.
 * @param {Response<PopulatedCharacter[]>} res - HTTP response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A JSON response containing the list of characters or an error message.
 *
 * @throws {NotFoundError} If the character list is empty or null.
 * @throws {Error} For any other unexpected errors during execution.
 */
export async function getAllCharacters(
  req: Request,
  res: Response<PopulatedCharacter[]>,
  next: NextFunction
): Promise<void> {
  try {
    const characters = await services.findAllCharacters();

    if (!characters || characters.length === 0)
      throw new NotFoundError("No characters found");

    const cleanCharacters = formatCharacters(characters);

    res.status(200).json(cleanCharacters);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}

/**
 * Endpoint to handle the HTTP GET request to retrieve one character
 * searching by its unique identifier.
 *
 * @async
 * @function getCharacterById
 * @param {Request} req - HTTP request object.
 * @param {Response<PopulatedCharacter>} res - HTTP response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A JSON response containing the character found or an error message.
 *
 * @throws {NotFoundError} If the character with the specified ID is not found.
 * @throws {Error} For any other unexpected errors during execution.
 */
export async function getCharacterById(
  req: Request,
  res: Response<PopulatedCharacter>,
  next: NextFunction
): Promise<void> {
  try {
    const id = req.params.id;
    const character = await services.findCharacterById(parseInt(id));

    if (!character) throw new NotFoundError("No character found");

    const cleanCharacter = formatCharacter(character);

    res.status(200).json(cleanCharacter);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}
