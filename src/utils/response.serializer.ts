import { Character } from '../models/character.model.js';
import { Location } from '../models/location.model.js';
import { Species } from '../models/species.model.js';
import { getResourceUrl } from './resource.url.js';

export type PopulatedLocation = Omit<Location, 'inhabitants'> & {
  inhabitants: Pick<Species, 'id' | 'name'>[];
};
export type PopulatedSpecies = Omit<Species, 'home'> & {
  home: Pick<Location, 'id' | 'name'>;
};
export type PopulatedCharacter = Omit<Character, 'origin' | 'species'> & {
  origin: Pick<Location, 'id' | 'name'>;
  species: Pick<Species, 'id' | 'name'>[];
};

export type SerializedLocation = ReturnType<typeof serializeLocation>;
export type SerializedSpecies = ReturnType<typeof serializeSpecies>;
export type SerializedCharacter = ReturnType<typeof serializeCharacter>;

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
      url: getResourceUrl('locations', doc.home.id),
    },
  };
}

export function serializeCharacter(doc: PopulatedCharacter) {
  return {
    ...doc,
    url: getResourceUrl('characters', doc.id),
    origin: {
      name: doc.origin.name,
      url: getResourceUrl('locations', doc.origin.id),
    },
    species: doc.species.map(({ id, ...species }) => ({
      ...species,
      url: getResourceUrl('species', id),
    })),
  };
}
