import Episode from "../interfaces/entities/episode.interface.js";
import episodeModel from "../models/entities/episode.model.js";
import { redisClient } from "../server.js";

/**
 * Find a list of episodes from the database.
 *
 * @async
 * @function findAllEpisodes
 * @returns {Promise<Episode[]>} A promise that resolves to a list of episodes.
 */
export async function findAllEpisodes(): Promise<Episode[]> {
  const reply = await redisClient.get("episodes");

  if (reply) return JSON.parse(reply);

  const foundEpisodes = await episodeModel
    .find()
    .select("-_id")
    .sort({ id: 1 })
    .lean();
  await redisClient.set("episodes", JSON.stringify(foundEpisodes));

  return foundEpisodes;
}

/**
 * Find an episode from the database, searching by its unique identifier.
 *
 * @async
 * @function findEpisodeById
 * @param {number} id - The unique identifier of the episode to find.
 * @returns {Promise<Episode | null>} A promise that resolves episode.
 */
export async function findEpisodeById(id: number): Promise<Episode | null> {
  const reply = await redisClient.get(`episode_${id}`);

  if (reply) return JSON.parse(reply);

  const foundEpisode = await episodeModel
    .findOne({ id: id })
    .select("-_id")
    .sort({ id: 1 })
    .lean();

  await redisClient.set(`episode_${id}`, JSON.stringify(foundEpisode));

  return foundEpisode;
}
