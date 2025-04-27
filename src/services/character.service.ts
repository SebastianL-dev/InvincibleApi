import characterModel from "../models/entities/character.model.js";
import "../models/entities/species.model.js";
import "../models/entities/location.model.js";
import "../models/entities/episode.model.js";
import Character from "../interfaces/entities/character.interface.js";
import { characterPopulateOptions } from "../populate/character.populate.js";
import { redisClient } from "../server.js";

/**
 * Find a list of characters from the database.
 *
 * @async
 * @function findAllCharacters
 * @returns {Promise<Character[]>} A promise that resolves to a list of characters with populated fields.
 */
export async function findAllCharacters(): Promise<Character[]> {
  const reply = await redisClient.get("characters");

  if (reply) return JSON.parse(reply);

  const foundCharacters = await characterModel
    .find()
    .select("-_id")
    .populate(characterPopulateOptions)
    .sort({ id: 1 })
    .lean();

  await redisClient.set("characters", JSON.stringify(foundCharacters));

  return foundCharacters;
}

/**
 * Find a character from the database, searching by its unique identifier.
 *
 * @async
 * @function findCharacterById
 * @param {number} id - The unique identifier of the character to find.
 * @returns {Promise<Character | null>} A promise that resolves character with populated fields.
 */
export async function findCharacterById(id: number): Promise<Character | null> {
  const reply = await redisClient.get(`character_${id}`);

  if (reply) return JSON.parse(reply);

  const foundCharacter = await characterModel
    .findOne({ id: id })
    .select("-_id")
    .populate(characterPopulateOptions)
    .sort({ id: 1 })
    .lean();

  await redisClient.set(`character_${id}`, JSON.stringify(foundCharacter));

  return foundCharacter;
}
