import { Request, Response } from 'express';
import { findAllLocations, findLocationById } from '../services/location.service.js';
import { LocationParams, LocationQuery } from '../validators/location.validator.js';

export async function getAllLocations(req: Request, res: Response) {
  const query = req.validated.query as LocationQuery;
  const locations = await findAllLocations(query);

  res.status(200).json(locations);
}

export async function getLocationById(req: Request, res: Response) {
  const { id } = req.validated.params as LocationParams;
  const location = await findLocationById(id);

  res.status(200).json(location);
}
