import { Request, Response } from 'express';
import { getCollectionsUrl } from '../utils/resource.url.js';

export async function getHomeInformation(req: Request, res: Response) {
  const response = {
    characters: getCollectionsUrl('characters'),
    species: getCollectionsUrl('species'),
    locations: getCollectionsUrl('locations'),
  };

  res.status(200).json(response);
}
