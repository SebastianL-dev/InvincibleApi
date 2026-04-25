import { Request } from 'express';
import { env } from '../config/env.config.js';
import { PaginatedResponse } from '../types/pagination.interface.js';

export function buildPageUrl(req: Request, page: number): string {
  const baseUrl = `${env.BASE_URL}${req.baseUrl}${req.path}`;
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(req.query)) {
    if (key !== 'page' && value !== undefined) {
      params.set(key, String(value));
    }
  }

  params.set('page', String(page));

  return `${baseUrl}?${params.toString()}`;
}

export function getPaginatedResponse<T>(
  count: number,
  pages: number,
  req: Request,
  query: { page: number },
  results: T[],
): PaginatedResponse<T> {
  return {
    info: {
      count,
      pages,
      next: query.page < pages ? buildPageUrl(req, query.page + 1) : null,
      prev: query.page > 1 ? buildPageUrl(req, query.page - 1) : null,
    },
    results,
  };
}
