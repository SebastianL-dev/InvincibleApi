import { Character } from '../models/character.model.js';
import { Episode } from '../models/episode.model.js';
import { Group } from '../models/group.model.js';
import { Location } from '../models/location.model.js';
import { Species } from '../models/species.model.js';
import { getResourceUrl } from './resource.url.js';

export type PopulatedLocation = Omit<Location, 'inhabitants'> & {
  inhabitants: Pick<Species, 'id' | 'name'>[];
};
export type PopulatedSpecies = Omit<Species, 'home'> & {
  home: Pick<Location, 'id' | 'name'>;
};
export type PopulatedCharacter = Omit<Character, 'origin' | 'species' | 'firstAppearance' | 'affiliations'> & {
  origin: Pick<Location, 'id' | 'name'>;
  species: Pick<Species, 'id' | 'name'>[];
  firstAppearance?: Pick<Episode, 'id' | 'name'> | null;
  affiliations: Pick<Group, 'id' | 'name'>[];
};
export type PopulatedGroup = Omit<Group, 'location' | 'members'> & {
  location: Pick<Location, 'id' | 'name'>;
  members: Pick<Character, 'id' | 'name'>[];
};
export type PopulatedEpisode = Episode;

export type SerializedLocation = ReturnType<typeof serializeLocation>;
export type SerializedSpecies = ReturnType<typeof serializeSpecies>;
export type SerializedCharacter = ReturnType<typeof serializeCharacter>;
export type SerializedGroup = ReturnType<typeof serializeGroup>;
export type SerializedEpisode = ReturnType<typeof serializeEpisode>;

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
    firstAppearance: doc.firstAppearance
      ? {
          name: doc.firstAppearance.name,
          url: getResourceUrl('episodes', doc.firstAppearance.id),
        }
      : null,
    affiliations: doc.affiliations.map(({ id, ...group }) => ({
      ...group,
      url: getResourceUrl('groups', id),
    })),
  };
}

export function serializeGroup(doc: PopulatedGroup) {
  return {
    ...doc,
    url: getResourceUrl('groups', doc.id),
    location: {
      name: doc.location.name,
      url: getResourceUrl('locations', doc.location.id),
    },
    members: doc.members.map(({ id, ...member }) => ({
      ...member,
      url: getResourceUrl('characters', id),
    })),
  };
}

export function serializeEpisode(doc: PopulatedEpisode) {
  return {
    ...doc,
    url: getResourceUrl('episodes', doc.id),
  };
}
