import Location, {
  PopulatedLocation,
} from "../../interfaces/entities/location.interface";

/**
 * Formats a populated location object by removing unnecessary properties
 * and transforming the inhabitants array to only include their names.
 *
 * @function formatLocation
 * @param {PopulatedLocation} location - The populated location object to format.
 * @returns {Location} A formatted location object containing the remaining properties,
 * a list of inhabitant names, and other specified fields.
 */
export default function formatLocation(location: PopulatedLocation): Location {
  const { _id, inhabitants, images, createdAt, updatedAt, ...rest } = location;

  const cleanInhabitants =
    inhabitants?.map((inhabitant) => inhabitant.name) || [];

  return {
    ...rest,
    inhabitants: cleanInhabitants,
    images,
    createdAt,
    updatedAt,
  };
}
