import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../utils/errors/client.errors.js';

export function notFoundMiddleware(req: Request, _res: Response, next: NextFunction) {
  next(new NotFoundError(`Cannot ${req.method} ${req.originalUrl}, route not found`));
}
