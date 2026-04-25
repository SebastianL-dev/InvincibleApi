import { QueryFilter } from 'mongoose';
import { Location, locationModel } from '../models/location.model.js';
import { NotFoundError } from '../utils/errors/client.errors.js';
import type { LocationQuery } from '../validators/location.validator.js';
import { escapeRegex } from '../utils/regex.js';
import { PopulatedLocation, serializeLocation } from '../utils/response.serializer.js';

export async function findAllLocations(query: LocationQuery) {
  const { page, limit, ..._filters } = query;
  const filter: QueryFilter<Location> = {};

  if (query.name) filter.name = { $regex: escapeRegex(query.name), $options: 'i' };
  if (query.type) filter.type = query.type;
  if (query.status) filter.status = query.status;

  const [results, count] = await Promise.all([
    locationModel
      .find(filter)
      .sort({ id: 1 })
      .select('-_id -updatedAt')
      .populate('inhabitants', 'name status id -_id')
      .skip((page - 1) * limit)
      .limit(limit)
      .lean<PopulatedLocation[]>(),
    locationModel.countDocuments(filter),
  ]);

  return { results: results.map(serializeLocation), count };
}

export async function findLocationById(id: number) {
  const result = await locationModel
    .findOne({ id })
    .select('-_id -updatedAt')
    .populate('inhabitants', 'name status id -_id')
    .lean<PopulatedLocation>();

  if (!result) throw new NotFoundError(`Location ${id} not found`);

  return serializeLocation(result);
}
