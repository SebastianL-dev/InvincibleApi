// Base class to create application errors.
export class BaseHttpError extends Error {
  status: number;

  constructor(message: string, name: string, status: number) {
    super(message);
    this.name = name;
    this.status = status;

    Error.captureStackTrace(this);
  }
}

// Factory to create application errors.
export const createAppError = function (
  name: string,
  status: number
): new (message: string) => BaseHttpError {
  return class HttpError extends BaseHttpError {
    constructor(message: string) {
      super(message, name, status);
    }
  };
};
