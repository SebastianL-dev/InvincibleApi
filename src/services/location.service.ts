import { locationModel } from '../models/location.model.js';
import { NotFoundError } from '../utils/errors/client.errors.js';

export async function findAllLocations() {
  const locations = await locationModel.find().select('-_id -updatedAt').lean();

  if (!locations || locations.length === 0) throw new NotFoundError('No locations found');

  return locations;
}

export async function findLocationById(id: number) {
  const location = await locationModel.findOne({ id }).select('-_id -updatedAt').lean();

  if (!location) throw new NotFoundError(`Location ${id} not found`);

  return location;
}

// TODO: implement function to find filtered locations in database using query params.
// export async function findFilteredLocations() {
//   const locations = await locationModel.find().select('-_id -updatedAt').lean();

//   return locations;
// }
