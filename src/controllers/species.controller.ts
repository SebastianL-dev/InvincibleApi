import { Request, Response } from 'express';
import { findAllSpecies, findSpeciesById } from '../services/species.service.js';
import { SpeciesQuery } from '../validators/species.validator.js';
import { NotFoundError } from '../utils/errors/client.errors.js';
import { SerializedSpecies } from '../utils/response.serializer.js';
import { getPaginatedResponse } from '../utils/pagination.js';
import { Params } from '../validators/url.validator.js';

export async function getAllSpecies(req: Request, res: Response) {
  const query = req.validated.query as SpeciesQuery;
  const { results, count } = await findAllSpecies(query);

  const pages = Math.ceil(count / query.limit) || 1;

  if (query.page > pages)
    throw new NotFoundError(`Page ${query.page} not found (last page is ${pages})`);

  const response = getPaginatedResponse<SerializedSpecies>(count, pages, req, query, results);

  res.status(200).json(response);
}

export async function getSpeciesById(req: Request, res: Response) {
  const { id } = req.validated.params as Params;
  const response = await findSpeciesById(id);

  res.status(200).json(response);
}
