import { Request } from 'express';

export function buildPageUrl(req: Request, page: number): string {
  const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(req.query)) {
    if (key !== 'page' && value != undefined) {
      params.set(key, String(value));
    }
  }

  params.set('page', String(page));

  return `${baseUrl}?${params.toString()}`;
}
