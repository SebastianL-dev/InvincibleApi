import { Request, Response } from "express";
import * as services from "../services/character.service.js";

/**
 * Endpoint to handle the HTTP GET request to retrieve all characters.
 *
 * @param {Request} req - HTTP request object.
 * @param {Response} res - HTTP response object.
 * @returns {Promise<void>} A JSON response containing the list of characters or an error message.
 *
 * @throws Will return a 500 status code with an error message if an exception occurs.
 */
export async function getAllCharacters(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const Characters = await services.findAllCharacters();

    res.status(200).json(Characters);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
