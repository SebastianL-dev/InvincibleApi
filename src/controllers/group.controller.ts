import { Request, Response } from 'express';
import { findAllGroups, findGroupById } from '../services/group.service.js';
import { NotFoundError } from '../utils/errors/client.errors.js';
import { getPaginatedResponse } from '../utils/pagination.js';
import { SerializedGroup } from '../utils/response.serializer.js';
import { GroupQuery } from '../validators/group.validator.js';
import { Params } from '../validators/url.validator.js';

export async function getAllGroups(req: Request, res: Response) {
  const query = req.validated.query as GroupQuery;
  const { results, count } = await findAllGroups(query);

  const pages = Math.ceil(count / query.limit) || 1;

  if (query.page > pages)
    throw new NotFoundError(`Page ${query.page} not found (last page is ${pages})`);

  const response = getPaginatedResponse<SerializedGroup>(count, pages, req, query, results);

  res.status(200).json(response);
}

export async function getGroupById(req: Request, res: Response) {
  const { id } = req.validated.params as Params;
  const response = await findGroupById(id);

  res.status(200).json(response);
}
