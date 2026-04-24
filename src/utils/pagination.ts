import { Request } from 'express';
import { env } from '../config/env.config.js';

export function buildPageUrl(req: Request, page: number): string {
  const baseUrl = `${env.BASE_URL}${req.baseUrl}${req.path}`;
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(req.query)) {
    if (key !== 'page' && value != undefined) {
      params.set(key, String(value));
    }
  }

  params.set('page', String(page));

  return `${baseUrl}?${params.toString()}`;
}
