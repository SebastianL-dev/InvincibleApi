import { Request, Response } from 'express';
import { findAllEpisodes, findEpisodeById } from '../services/episode.service.js';
import { NotFoundError } from '../utils/errors/client.errors.js';
import { getPaginatedResponse } from '../utils/pagination.js';
import { SerializedEpisode } from '../utils/response.serializer.js';
import { EpisodeQuery } from '../validators/episode.validator.js';
import { Params } from '../validators/url.validator.js';

export async function getAllEpisodes(req: Request, res: Response) {
  const query = req.validated.query as EpisodeQuery;
  const { results, count } = await findAllEpisodes(query);

  const pages = Math.ceil(count / query.limit) || 1;

  if (query.page > pages)
    throw new NotFoundError(`Page ${query.page} not found (last page is ${pages})`);

  const response = getPaginatedResponse<SerializedEpisode>(count, pages, req, query, results);

  res.status(200).json(response);
}

export async function getEpisodeById(req: Request, res: Response) {
  const { id } = req.validated.params as Params;
  const response = await findEpisodeById(id);

  res.status(200).json(response);
}
