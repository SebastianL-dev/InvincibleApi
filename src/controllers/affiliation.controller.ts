import { NextFunction, Request, Response } from "express";
import * as services from "../services/affiliation.service.js";
import { NotFoundError } from "../utils/errors/custom/client.errors.js";
import { PopulatedAffiliation } from "../interfaces/entities/affiliation.interface.js";
import {
  formatAffiliation,
  formatAffiliations,
} from "../utils/format/cleanAffiliations.format.js";

export async function getAllAffiliations(
  req: Request,
  res: Response<PopulatedAffiliation[]>,
  next: NextFunction
): Promise<void> {
  try {
    const affiliations = await services.findAllAffiliations();

    if (!affiliations || affiliations.length === 0)
      throw new NotFoundError("No affiliations found");

    const cleanAffiliations = formatAffiliations(affiliations);

    res.status(200).json(cleanAffiliations);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}

export async function getAffiliationById(
  req: Request,
  res: Response<PopulatedAffiliation>,
  next: NextFunction
): Promise<void> {
  try {
    const id = req.params.id;

    const affiliation = await services.findAffiliationById(parseInt(id));

    if (!affiliation) throw new NotFoundError("No affiliation found");

    const cleanAffiliation = formatAffiliation(affiliation);

    res.status(200).json(cleanAffiliation);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}
