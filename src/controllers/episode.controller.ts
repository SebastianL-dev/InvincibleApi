import { NextFunction, Request, Response } from "express";
import * as services from "../services/episode.service.js";
import { NotFoundError } from "../utils/errors/custom/client.errors.js";
import Episode from "../interfaces/entities/episode.interface.js";

/**
 * Endpoint to handle the HTTP GET request to retrieve all episodes.
 *
 * @async
 * @function getAllEpisodes
 * @param {Request} req - HTTP request object.
 * @param {Response<Episode[]>} res - HTTP response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A JSON response containing the list of episodes or an error message.
 *
 * @throws {NotFoundError} If the episode list is empty or null.
 * @throws {Error} For any other unexpected errors during execution.
 */
export async function getAllEpisodes(
  req: Request,
  res: Response<Episode[]>,
  next: NextFunction
): Promise<void> {
  try {
    const episodes = await services.findAllEpisodes();

    if (!episodes || episodes.length === 0)
      throw new NotFoundError("No episodes found");

    res.status(200).json(episodes);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}

/**
 * Endpoint to handle the HTTP GET request to retrieve one episode
 * searching by its unique identifier.
 *
 * @async
 * @function getEpisodeById
 * @param {Request} req - HTTP request object.
 * @param {Response<Episode>} res - HTTP response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A JSON response containing the episode found or an error message.
 *
 * @throws {NotFoundError} If the episode with the specified ID is not found.
 * @throws {Error} For any other unexpected errors during execution.
 */
export async function getEpisodeById(
  req: Request,
  res: Response<Episode>,
  next: NextFunction
): Promise<void> {
  try {
    const id = req.params.id;

    const episode = await services.findEpisodeById(parseInt(id));

    if (!episode) throw new NotFoundError("No episode found");

    res.status(200).json(episode);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}
