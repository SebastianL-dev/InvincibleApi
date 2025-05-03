import Character, {
  PopulatedCharacter,
} from "../../interfaces/entities/character.interface";

/**
 * Formats a character object by transforming some fields into the respective name if
 * they exist and are valid, otherwise defaults them to an empty string.
 *
 * @function formatCharacter
 * @param {Character} character - A `Character` object to be formatted.
 * @returns {PopulatedCharacter} A `PopulatedCharacter` object with formatted its properties.
 */
export function formatCharacter(character: Character): PopulatedCharacter {
  return {
    ...character,
    species: isName(character.species) ? character.species.name : "",
    origin: isName(character.origin) ? character.origin.name : "",
    location: isName(character.location) ? character.location.name : "",
  };
}

/**
 * Formats an array of species by mapping each Species through the `formatCharacter` function.
 *
 * @param {Character[]} character - An array of `Characters` objects to be formatted.
 * @returns {PopulatedCharacter[]} An array of `PopulatedCharacters` objects after formatting.
 */
export function formatCharacters(character: Character[]): PopulatedCharacter[] {
  return character.map(formatCharacter);
}

/**
 * Type guard function to determine if a given object is of type `{name: string}`.
 *
 * @function isName
 * @param {unknown} obj - The object to check.
 * @returns {boolean} A boolean indicating whether the object is of type `{name: string}`.
 */
function isName(obj: unknown): obj is { name: string } {
  return typeof obj === "object" && obj !== null && "name" in obj;
}
