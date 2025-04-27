/**
 * Character populate options for character services.
 *
 * - Excludes the `_id` field from all documents.
 * - Populates the `species` field (include location)
 * - Populates the `origin` and `location` fields (include inhabitants)
 * - Populates the `firstAppearance` field.
 *
 * @constant characterPopulateOptions
 */
export const characterPopulateOptions = [
  {
    path: "species",
    select: "-_id name",
  },
  {
    path: "origin",
    select: "-_id name",
  },
  {
    path: "location",
    select: "-_id name",
  },
  {
    path: "firstAppearance",
    select: "-_id episode season title",
  },
];
