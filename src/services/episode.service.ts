import { QueryFilter } from 'mongoose';
import { Episode, episodeModel } from '../models/episode.model.js';
import { NotFoundError } from '../utils/errors/client.errors.js';
import { escapeRegex } from '../utils/regex.js';
import { PopulatedEpisode, serializeEpisode } from '../utils/response.serializer.js';
import type { EpisodeQuery } from '../validators/episode.validator.js';

export async function findAllEpisodes(query: EpisodeQuery) {
  const { page, limit } = query;
  const filter: QueryFilter<Episode> = {};

  if (query.name) filter.name = { $regex: escapeRegex(query.name), $options: 'i' };
  if (query.season !== undefined) filter.season = query.season;
  if (query.episode !== undefined) filter.episode = query.episode;

  const [results, count] = await Promise.all([
    episodeModel
      .find(filter)
      .sort({ id: 1 })
      .select('-_id -updatedAt')
      .skip((page - 1) * limit)
      .limit(limit)
      .lean<PopulatedEpisode[]>(),
    episodeModel.countDocuments(filter),
  ]);

  return { results: results.map(serializeEpisode), count };
}

export async function findEpisodeById(id: number) {
  const result = await episodeModel.findOne({ id }).select('-_id -updatedAt').lean<PopulatedEpisode>();

  if (!result) throw new NotFoundError(`Episode ${id} not found`);

  return serializeEpisode(result);
}
