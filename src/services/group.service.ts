import { QueryFilter } from 'mongoose';
import { characterModel } from '../models/character.model.js';
import { Group, groupModel } from '../models/group.model.js';
import { locationModel } from '../models/location.model.js';
import { NotFoundError } from '../utils/errors/client.errors.js';
import { escapeRegex } from '../utils/regex.js';
import { PopulatedGroup, serializeGroup } from '../utils/response.serializer.js';
import type { GroupQuery } from '../validators/group.validator.js';

const EMPTY_RESULT = { results: [], count: 0 };

export async function findAllGroups(query: GroupQuery) {
  const { page, limit } = query;
  const filter: QueryFilter<Group> = {};

  if (query.name) filter.name = { $regex: escapeRegex(query.name), $options: 'i' };
  if (query.status) filter.status = query.status;

  if (query.location !== undefined) {
    const location = await locationModel.findOne({ id: query.location }).select('_id').lean();
    if (!location) return EMPTY_RESULT;
    filter.location = location._id;
  }

  if (query.member !== undefined) {
    const character = await characterModel.findOne({ id: query.member }).select('_id').lean();
    if (!character) return EMPTY_RESULT;
    filter.members = { $in: [character._id] };
  }

  const [results, count] = await Promise.all([
    groupModel
      .find(filter)
      .sort({ id: 1 })
      .select('-_id -updatedAt')
      .populate('location', 'name id -_id')
      .populate('members', 'name id -_id')
      .skip((page - 1) * limit)
      .limit(limit)
      .lean<PopulatedGroup[]>(),
    groupModel.countDocuments(filter),
  ]);

  return { results: results.map(serializeGroup), count };
}

export async function findGroupById(id: number) {
  const result = await groupModel
    .findOne({ id })
    .select('-_id -updatedAt')
    .populate('location', 'name id -_id')
    .populate('members', 'name id -_id')
    .lean<PopulatedGroup>();

  if (!result) throw new NotFoundError(`Group ${id} not found`);

  return serializeGroup(result);
}
