import { NextFunction, Request, Response } from 'express';
import { BaseHttpError } from '../utils/errors/httpError.factory.js';
import logger from '../utils/logger.js';

export function errorMiddleware(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (!err) return next();

  if (err instanceof BaseHttpError) {
    const { message, name, status } = err;
    return res.status(status).json({ name, message });
  }

  logger.error('Unhandled error', true, err);

  return res.status(500).json({
    name: 'InternalServerError',
    message: 'Unexpected server error',
  });
}
