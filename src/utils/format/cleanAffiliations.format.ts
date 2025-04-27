import Affiliation, {
  PopulatedAffiliation,
} from "../../interfaces/entities/affiliation.interface";

/**
 * Formats an affiliation object by transforming its `leader` and `location` fields
 * into their respective names if they exist and are valid, otherwise defaults them to an empty string.
 *
 * @function formatAffiliation
 * @param {Affiliation} affiliation - The `Affiliation` object to be formatted.
 * @returns {PopulatedAffiliation} The `PopulatedAffiliation` object with formatted `leader` and `location` properties.
 */
export function formatAffiliation(
  affiliation: Affiliation
): PopulatedAffiliation {
  return {
    ...affiliation,
    leader: isLeader(affiliation.leader) ? affiliation.leader.shortName : "",
    location: isLocation(affiliation.location) ? affiliation.location.name : "",
  };
}

/**
 * Formats an array of affiliations by mapping each affiliation through the `formatAffiliation` function.
 *
 * @param {Affiliation[]} affiliation - An array of `Affiliation` objects to be formatted.
 * @returns {PopulatedAffiliation[]} An array of `PopulatedAffiliation` objects after formatting.
 */
export function formatAffiliations(
  affiliation: Affiliation[]
): PopulatedAffiliation[] {
  return affiliation.map(formatAffiliation);
}

/**
 * Type guard function to determine if a given object is of type `{ shortName: string }`.
 *
 * @function isLeader
 * @param {unknown} obj - The object to check.
 * @returns {boolean} A boolean indicating whether the object is of type `{ shortName: string }`.
 */
function isLeader(obj: unknown): obj is { shortName: string } {
  return typeof obj === "object" && obj !== null && "shortName" in obj;
}

/**
 * Type guard function to determine if a given object is of type `{ name: string }`.
 *
 * @function isLocation
 * @param {unknown} obj - The object to check.
 * @returns {boolean} A boolean indicating whether the object is of type `{ name: string }`.
 */
function isLocation(obj: unknown): obj is { name: string } {
  return typeof obj === "object" && obj !== null && "name" in obj;
}
