import { env } from '../config/env.config.js';

const API_PREFIX = '/api/v0';

export type resourceName = 'characters' | 'locations' | 'species' | 'affiliations' | 'groups' | 'episodes';

export function getResourceUrl(resource: resourceName, id: number): string {
  return `${env.BASE_URL}${API_PREFIX}/${resource}/${id}`;
}

export function getResourceUrls(resource: resourceName, ids: number[]): string[] {
  return ids.map((id) => getResourceUrl(resource, id));
}

export function getCollectionsUrl(resource: resourceName) {
  return `${env.BASE_URL}${API_PREFIX}/${resource}`;
}
