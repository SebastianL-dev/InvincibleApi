// Base class to create application errors.
export class BaseHttpError extends Error {
    status;
    constructor(message, name, status) {
        super(message);
        this.name = name;
        this.status = status;
        Error.captureStackTrace(this);
    }
}
// Factory to create application errors.
export const createAppError = function (name, status) {
    return class HttpError extends BaseHttpError {
        constructor(message) {
            super(message, name, status);
        }
    };
};
