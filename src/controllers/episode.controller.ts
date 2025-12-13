import { NextFunction, Request, Response } from "express";
import * as services from "../services/episode.service.js";
import { NotFoundError } from "../utils/errors/custom/client.errors.js";
import Episode from "../interfaces/entities/episode.interface.js";

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
