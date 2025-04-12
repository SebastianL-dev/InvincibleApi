import characterModel from "../models/entities/character.model.js";
import "../models/entities/species.model.js";
import "../models/entities/location.model.js";
import "../models/entities/episode.model.js";
import Character from "../interfaces/entities/character.interface.js";
import { characterPopulateOptions } from "../populate/character.populate.js";

/**
 * Find a list of characters from the database.
 *
 * @async
 * @function getAllCharacters
 * @returns {Promise<Character[]>} A promise that resolves to a list of characters with populated fields.
 */
export async function findAllCharacters(): Promise<Character[]> {
  const charactersFound = await characterModel
    .find()
    .select("-_id")
    .populate(characterPopulateOptions)
    .lean();

  return charactersFound;
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
  const characterFound = await characterModel
    .findOne({ id: id })
    .select("-_id")
    .populate(characterPopulateOptions)
    .lean();

  return characterFound;
}
