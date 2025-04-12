/**
 * Error interface including status code.
 *
 * @interface HttpError
 */
export default interface HttpError extends Error {
  status: number;
}
