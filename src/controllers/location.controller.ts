import { Request, Response } from 'express';
import { findAllLocations, findLocationById } from '../services/location.service.js';

export async function getAllLocations(_req: Request, res: Response) {
  const locations = await findAllLocations();

  res.status(200).json(locations);
}

export async function getLocationById(req: Request, res: Response) {
  const id = req.params.id.toString();
  const location = await findLocationById(parseInt(id));

  res.status(200).json(location);
}
