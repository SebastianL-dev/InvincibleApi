import { NextFunction, Request, Response } from "express";
import * as services from "../services/species.service.js";
import { NotFoundError } from "../utils/errors/custom/client.errors.js";
import { PopulatedSpecies } from "../interfaces/entities/species.interface.js";
import {
  formatSpecies,
  formatSingleSpecies,
} from "../utils/format/cleanSpecies.format.js";

export async function getAllSpecies(
  req: Request,
  res: Response<PopulatedSpecies[]>,
  next: NextFunction
): Promise<void> {
  try {
    const species = await services.findAllSpecies();

    if (!species || species.length === 0)
      throw new NotFoundError("No species found");

    const cleanSpecies = formatSpecies(species);

    res.status(200).json(cleanSpecies);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}

export async function getSpeciesById(
  req: Request,
  res: Response<PopulatedSpecies>,
  next: NextFunction
): Promise<void> {
  try {
    const id = req.params.id;

    const species = await services.findSpeciesById(parseInt(id));

    if (!species) throw new NotFoundError("No species found");

    const cleanSpecies = formatSingleSpecies(species);

    res.status(200).json(cleanSpecies);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}
