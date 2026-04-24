import { Location } from '../models/location.model.js';
import { getResourceUrl } from './resource.url.js';

export type SerializedLocation = ReturnType<typeof serializeLocation>;

export function serializeLocation(doc: Location) {
  return {
    ...doc,
    url: getResourceUrl('locations', doc.id),
  };
}
