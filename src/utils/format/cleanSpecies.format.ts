import Species, {
  PopulatedSpecies,
} from "../../interfaces/entities/species.interface";

/**
 * Formats a species object by transforming its `home` field into the respective name if
 * they exist and are valid, otherwise defaults them to an empty string.
 *
 * @function formatSpecies
 * @param {Species[]} species - An array of `Species` objects to be formatted.
 * @returns {PopulatedSpecies[]} An array of `PopulatedSpecies` objects with formatted `home` properties.
 */
export function formatSingleSpecies(species: Species): PopulatedSpecies {
  return {
    ...species,
    home: isHome(species.home) ? species.home.name : "",
  };
}

/**
 * Formats an array of species by mapping each Species through the `formatSingleSpecies` function.
 *
 * @param {formatSingleSpecies[]} species - An array of `Species` objects to be formatted.
 * @returns {PopulatedSpecies[]} An array of `PopulatedSpecies` objects after formatting.
 */
export function formatSpecies(species: Species[]): PopulatedSpecies[] {
  return species.map(formatSingleSpecies);
}

/**
 * Type guard function to determine if a given object is of type `{name: string}`.
 *
 * @function isHome
 * @param {unknown} obj - The object to check.
 * @returns {boolean} A boolean indicating whether the object is of type `{name: string}`.
 */
function isHome(obj: unknown): obj is { name: string } {
  return typeof obj === "object" && obj !== null && "name" in obj;
}
