import { NextFunction, Request, Response } from 'express';
import { BaseHttpError } from '../utils/errors/httpError.factory.js';
import logger from '../utils/console/logger.js';

export function errorMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction) {
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
