import GlobalObject from "@/interfaces/global/global.object.interface.js";

/**
 * Normalizes an array of JSON objects by ensuring specific fields are properly formatted.
 *
 * @function normalizeJson
 * @param {GlobalObject[]} json - Items list in JSON format.
 * @returns {GlobalObject[]} A list with the normalized JSON items.
 */
export default function normalizeJson(json: GlobalObject[]): GlobalObject[] {
  const normalizedJson = json.map((items: GlobalObject) => ({
    ...items,
    _id: items._id ? items._id : undefined,
    createdAt: items.createdAt ? new Date(items.createdAt) : undefined,
    updatedAt: new Date(),
  }));

  return normalizedJson;
}
