import { QueryFilter } from 'mongoose';
import { Location, locationModel } from '../models/location.model.js';
import { NotFoundError } from '../utils/errors/client.errors.js';
import type { LocationQuery } from '../validators/location.validator.js';
import { escapeRegex } from '../utils/regex.js';

export async function findAllLocations(query: LocationQuery = {}) {
  const filter: QueryFilter<Location> = {};

  if (query.name) filter.name = { $regex: escapeRegex(query.name), $options: 'i' };
  if (query.type) filter.type = query.type;
  if (query.status) filter.status = query.status;

  const locations = await locationModel
    .find(filter)
    .sort({ id: 1 })
    .select('-_id -updatedAt')
    .lean();

  if (!locations) throw new NotFoundError('No locations found');

  return locations;
}

export async function findLocationById(id: number) {
  const location = await locationModel.findOne({ id }).select('-_id -updatedAt').lean();

  if (!location) throw new NotFoundError(`Location ${id} not found`);

  return location;
}
