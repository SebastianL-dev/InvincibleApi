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
    select: "-_id -id",
    populate: { path: "location", select: "name type -_id" },
  },
  {
    path: "origin",
    select: "-_id -id",
    populate: { path: "inhabitants", select: "name -_id" },
  },
  {
    path: "location",
    select: "-_id -id",
    populate: { path: "inhabitants", select: "name  -_id" },
  },
  {
    path: "firstAppearance",
    select: "-_id",
  },
];
