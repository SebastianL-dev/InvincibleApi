import { Request, Response } from 'express';
import { findAllLocations, findLocationById } from '../services/location.service.js';
import { LocationParams, LocationQuery } from '../validators/location.validator.js';
import { NotFoundError } from '../utils/errors/client.errors.js';
import { buildPageUrl } from '../utils/pagination.js';
import { PaginatedResponse } from '../types/pagination.interface.js';
import { Location } from '../models/location.model.js';

export async function getAllLocations(req: Request, res: Response) {
  const query = req.validated.query as LocationQuery;
  const { results, count } = await findAllLocations(query);

  const pages = Math.ceil(count / query.limit) || 1;

  if (query.page > pages)
    throw new NotFoundError(`Page ${query.page} not found (last page is ${pages})`);

  const response: PaginatedResponse<Location> = {
    info: {
      count,
      pages,
      next: query.page < pages ? buildPageUrl(req, query.page + 1) : null,
      prev: query.page > 1 ? buildPageUrl(req, query.page - 1) : null,
    },
    results,
  };

  res.status(200).json(response);
}

export async function getLocationById(req: Request, res: Response) {
  const { id } = req.validated.params as LocationParams;
  const location = await findLocationById(id);

  res.status(200).json(location);
}
