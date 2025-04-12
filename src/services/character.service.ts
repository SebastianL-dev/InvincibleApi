import characterModel from "../models/entities/character.model.js";
import "../models/entities/species.model.js";
import "../models/entities/location.model.js";
import "../models/entities/episode.model.js";
import Character from "../interfaces/entities/character.interface.js";

/**
 * Retrieves a list of characters from the database with specific fields excluded
 * and populates related data from referenced collections.
 *
 * - Excludes the `_id` field from all documents.
 * - Populates the `species` field (include location)
 * - Populates the `origin` and `location` fields (include inhabitants)
 * - Populates the `firstAppearance` field.
 *
 * @async
 * @function getAllCharacters
 * @returns {Promise<Character[]>} A promise that resolves to a list of characters with populated fields.
 */
export async function findAllCharacters(): Promise<Character[]> {
  const Characters = await characterModel
    .find()
    .select("-_id")
    .populate({
      path: "species",
      select: "-_id",
      populate: { path: "location", select: "name type images id -_id" },
    })
    .populate({
      path: "origin",
      select: "-_id",
      populate: { path: "inhabitants", select: "name images id -_id" },
    })
    .populate({
      path: "location",
      select: "-_id",
      populate: { path: "inhabitants", select: "name images id -_id" },
    })
    .populate({
      path: "firstAppearance",
      select: "-_id",
    });

  return Characters;
}
