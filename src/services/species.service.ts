import { QueryFilter } from 'mongoose';
import { speciesModel } from '../models/species.model.js';
import { NotFoundError } from '../utils/errors/client.errors.js';
import { escapeRegex } from '../utils/regex.js';
import { PopulatedSpecies, serializeSpecies } from '../utils/response.serializer.js';
import { SpeciesQuery } from '../validators/species.validator.js';

export async function findAllSpecies(query: SpeciesQuery) {
  const { page, limit, ..._filters } = query;
  const filter: QueryFilter<Location> = {};

  if (query.name) filter.name = { $regex: escapeRegex(query.name), $options: 'i' };
  if (query.status) filter.status = query.status;

  const [results, count] = await Promise.all([
    speciesModel
      .find()
      .sort({ id: 1 })
      .select('-_id -updatedAt')
      .populate('home', 'name status id -_id')
      .skip((page - 1) * limit)
      .limit(limit)
      .lean<PopulatedSpecies[]>(),
    speciesModel.countDocuments(),
  ]);

  return { results: results.map(serializeSpecies), count };
}

export async function findSpeciesById(id: number) {
  const result = await speciesModel
    .findOne({ id })
    .select('-_id -updatedAt')
    .populate('home', 'name status id -_id')
    .lean<PopulatedSpecies>();

  if (!result) throw new NotFoundError(`Species ${id} not found`);

  return serializeSpecies(result);
}
