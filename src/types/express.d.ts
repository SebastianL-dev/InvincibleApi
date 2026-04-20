import type { ZodType } from 'zod';

declare global {
  namespace Express {
    interface Request {
      validated: {
        params?: unknown;
        query?: unknown;
        body?: unknown;
      };
    }
  }
}

export {};
