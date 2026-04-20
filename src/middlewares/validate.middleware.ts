import { NextFunction, Request, Response } from 'express';
import { ZodType } from 'zod';
import { BadRequestError } from '../utils/errors/client.errors.js';

type Schemas = {
  params?: ZodType;
  query?: ZodType;
  body?: ZodType;
};

// type Validated = Partial<Record<'params' | 'query' | 'body', unknown>>;

export function validate(schemas: Schemas) {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.validated = {};

    for (const key of ['params', 'query', 'body'] as const) {
      const schema = schemas[key];
      if (!schema) continue;

      const result = schema.safeParse(req[key]);
      if (!result.success) {
        const first = result.error.issues[0];
        const path = first.path.join('.');
        return next(
          new BadRequestError(`Invalid ${key}${path ? `.${path}` : ''}: ${first.message}`),
        );
      }

      req.validated[key] = result.data;
    }

    next();
  };
}
