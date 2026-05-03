import { QueryFilter } from 'mongoose';
import { Character, characterModel } from '../models/character.model.js';
import { episodeModel } from '../models/episode.model.js';
import { groupModel } from '../models/group.model.js';
import { locationModel } from '../models/location.model.js';
import { speciesModel } from '../models/species.model.js';
import { NotFoundError } from '../utils/errors/client.errors.js';
import { escapeRegex } from '../utils/regex.js';
import { PopulatedCharacter, serializeCharacter } from '../utils/response.serializer.js';
import type { CharacterQuery } from '../validators/character.validator.js';

const EMPTY_RESULT = { results: [], count: 0 };

export async function findAllCharacters(query: CharacterQuery) {
  const { page, limit, ..._filters } = query;
  const filter: QueryFilter<Character> = {};

  if (query.name) filter.name = { $regex: escapeRegex(query.name), $options: 'i' };
  if (query.status) filter.status = query.status;
  if (query.gender) filter.gender = { $regex: escapeRegex(query.gender), $options: 'i' };

  if (query.origin !== undefined) {
    const location = await locationModel.findOne({ id: query.origin }).select('_id').lean();
    if (!location) return EMPTY_RESULT;
    filter.origin = location._id;
  }

  if (query.species !== undefined) {
    const species = await speciesModel.findOne({ id: query.species }).select('_id').lean();
    if (!species) return EMPTY_RESULT;
    filter.species = { $in: [species._id] };
  }

  if (query.firstAppearance !== undefined) {
    const episode = await episodeModel.findOne({ id: query.firstAppearance }).select('_id').lean();
    if (!episode) return EMPTY_RESULT;
    filter.firstAppearance = episode._id;
  }

  if (query.affiliation !== undefined) {
    const group = await groupModel.findOne({ id: query.affiliation }).select('_id').lean();
    if (!group) return EMPTY_RESULT;
    filter.affiliations = { $in: [group._id] };
  }

  const [results, count] = await Promise.all([
    characterModel
      .find(filter)
      .sort({ id: 1 })
      .select('-_id -updatedAt')
      .populate('origin', 'name id -_id')
      .populate('species', 'name id -_id')
      .populate('firstAppearance', 'name id -_id')
      .populate('affiliations', 'name id -_id')
      .skip((page - 1) * limit)
      .limit(limit)
      .lean<PopulatedCharacter[]>(),
    characterModel.countDocuments(filter),
  ]);

  return { results: results.map(serializeCharacter), count };
}

export async function findCharacterById(id: number) {
  const result = await characterModel
    .findOne({ id })
    .select('-_id -updatedAt')
    .populate('origin', 'name id -_id')
    .populate('species', 'name id -_id')
    .populate('firstAppearance', 'name id -_id')
    .populate('affiliations', 'name id -_id')
    .lean<PopulatedCharacter>();

  if (!result) throw new NotFoundError(`Character ${id} not found`);

  return serializeCharacter(result);
}
