/**
 * Affiliation populate options for affiliation services.
 *
 * - Excludes the `_id` field from all documents.
 * - Populates the `location` field.
 * - Populates the `leader` and `location` fields (include inhabitants)
 *
 * @constant affiliationPopulateOptions
 */
export const affiliationPopulateOptions = [
  {
    path: "location",
    select: "-_id name",
  },
  {
    path: "leader",
    select: "-_id shortName",
  },
];
