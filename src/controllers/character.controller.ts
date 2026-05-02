import { Request, Response } from 'express';
import { findAllCharacters, findCharacterById } from '../services/character.service.js';
import { CharacterQuery } from '../validators/character.validator.js';
import { NotFoundError } from '../utils/errors/client.errors.js';
import { getPaginatedResponse } from '../utils/pagination.js';
import { SerializedCharacter } from '../utils/response.serializer.js';
import { Params } from '../validators/url.validator.js';

export async function getAllCharacters(req: Request, res: Response) {
  const query = req.validated.query as CharacterQuery;
  const { results, count } = await findAllCharacters(query);

  const pages = Math.ceil(count / query.limit) || 1;

  if (query.page > pages)
    throw new NotFoundError(`Page ${query.page} not found (last page is ${pages})`);

  const response = getPaginatedResponse<SerializedCharacter>(count, pages, req, query, results);

  res.status(200).json(response);
}

export async function getCharacterById(req: Request, res: Response) {
  const { id } = req.validated.params as Params;
  const response = await findCharacterById(id);

  res.status(200).json(response);
}
