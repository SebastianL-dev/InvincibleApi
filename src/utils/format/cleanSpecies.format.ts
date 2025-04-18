import Species, {
  Home,
  PopulatedSpecies,
} from "../../interfaces/entities/species.interface";

/**
 * Formats an array of `Species` objects into an array of `PopulatedSpecies` objects.
 *
 * This function maps over the input `species` array and transforms each `Species` object
 * by spreading its properties and replacing the `home` property with the name of the home
 * if it is valid, or `null` otherwise.
 *
 * @function cleanSpecies
 * @param {Species[]} species - An array of `Species` objects to be formatted.
 * @returns {PopulatedSpecies[]} An array of `PopulatedSpecies` objects with formatted `home` properties.
 */
export function formatSpecies(species: Species[]): PopulatedSpecies[] {
  return species.map((s) => ({
    ...s,
    home: isHome(s.home) ? s.home.name : "",
  }));
}

/**
 * Type guard function to determine if a given object is of type `Home`.
 *
 * @function isHome
 * @param {unknown} obj - The object to check.
 * @returns {boolean} A boolean indicating whether the object is of type `Home`.
 */
function isHome(obj: unknown): obj is Home {
  return typeof obj === "object" && obj !== null && "name" in obj;
}
