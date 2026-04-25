import { Request, Response } from 'express';
import { findAllLocations, findLocationById } from '../services/location.service.js';
import { LocationQuery } from '../validators/location.validator.js';
import { NotFoundError } from '../utils/errors/client.errors.js';
import { getPaginatedResponse } from '../utils/pagination.js';
import { SerializedLocation } from '../utils/response.serializer.js';
import { Params } from '../validators/url.validator.js';

export async function getAllLocations(req: Request, res: Response) {
  const query = req.validated.query as LocationQuery;
  const { results, count } = await findAllLocations(query);

  const pages = Math.ceil(count / query.limit) || 1;

  if (query.page > pages)
    throw new NotFoundError(`Page ${query.page} not found (last page is ${pages})`);

  const response = getPaginatedResponse<SerializedLocation>(count, pages, req, query, results);

  res.status(200).json(response);
}

export async function getLocationById(req: Request, res: Response) {
  const { id } = req.validated.params as Params;
  const response = await findLocationById(id);

  res.status(200).json(response);
}
