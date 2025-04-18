/**
 * Location populate options for location services.
 *
 * - Only includes the name field in the document.
 *
 * @constant locationPopulateOptions
 */

export const locationPopulateOptions = {
  path: "inhabitants",
  select: "name -_id -home",
};
