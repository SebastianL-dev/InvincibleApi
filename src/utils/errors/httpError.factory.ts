export class BaseHttpError extends Error {
  status: number;

  constructor(message: string, name: string, status: number) {
    super(message);

    this.name = name;
    this.status = status;
  }
}

export function createAppError(
  name: string,
  status: number,
): new (message: string) => BaseHttpError {
  return class HttpError extends BaseHttpError {
    constructor(message: string) {
      super(message, name, status);
    }
  };
}

export interface HttpError extends Error {
  status: number;
}
