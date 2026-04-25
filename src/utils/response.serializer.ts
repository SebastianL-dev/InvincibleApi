import { Location } from '../models/location.model.js';
import { Species } from '../models/species.model.js';
import { getResourceUrl } from './resource.url.js';

export type PopulatedLocation = Omit<Location, 'inhabitants'> & {
  inhabitants: Pick<Species, 'id' | 'name' | 'status'>[];
};
export type PopulatedSpecies = Omit<Species, 'home'> & {
  home: Pick<Location, 'id' | 'name' | 'status'>;
};

export type SerializedLocation = ReturnType<typeof serializeLocation>;
export type SerializedSpecies = ReturnType<typeof serializeSpecies>;

export function serializeLocation(doc: PopulatedLocation) {
  return {
    ...doc,
    url: getResourceUrl('locations', doc.id),
    inhabitants: doc.inhabitants.map(({ id, ...species }) => ({
      ...species,
      url: getResourceUrl('species', id),
    })),
  };
}

export function serializeSpecies(doc: PopulatedSpecies) {
  return {
    ...doc,
    url: getResourceUrl('species', doc.id),
    home: {
      name: doc.home.name,
      status: doc.home.status,
      url: getResourceUrl('locations', doc.home.id),
    },
  };
}
