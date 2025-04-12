/**
 * Represents a base HTTP error with a status code, name, and message.
 * Extends the built-in `Error` class to include additional properties.
 */
export class BaseHttpError extends Error {
  /**
   * The HTTP status code associated with the error.
   */
  status: number;

  /**
   * Creates the constructor of `BaseHttpError`.
   *
   * @param {string} message - A descriptive error message.
   * @param {string} name - The name of the error.
   * @param {number} status - The HTTP status code representing the error.
   */
  constructor(message: string, name: string, status: number) {
    super(message);
    this.name = name;
    this.status = status;

    Error.captureStackTrace(this);
  }
}

/**
 * Factory function to create custom application error classes.
 *
 * @param {string} name - The name of the error (e.g., "NotFoundError").
 * @param {number} status - The HTTP status code associated with the error (e.g., 404).
 * @returns {new (message: string) => BaseHttpError} A custom error class extending `BaseHttpError`.
 */
export const createAppError = function (
  name: string,
  status: number
): new (message: string) => BaseHttpError {
  return class HttpError extends BaseHttpError {
    /**
     * Creates the constructor of `HttpError`.
     *
     * @param {string} message - A descriptive error message.
     */
    constructor(message: string) {
      super(message, name, status);
    }
  };
};
