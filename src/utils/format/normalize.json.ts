import Character from "../../interfaces/entities/character.interface";

/**
 * Normalizes an array of characters by ensuring specific fields are properly formatted.
 *
 * @function normalizeCharacter
 * @param {Character[]} characters - Characters list in json format
 * @returns {Character[]} A list with the normalized characters.
 */
export default function normalizeCharacters(
  characters: Character[]
): Character[] {
  const normalizedCharacters = characters.map((character: Character) => ({
    ...character,
    _id: character._id ? character._id : undefined,
    createdAt: character.createdAt ? new Date(character.createdAt) : undefined,
    updatedAt: new Date(),
  }));

  return normalizedCharacters;
}
