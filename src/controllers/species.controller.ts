import { NextFunction, Request, Response } from "express";
import {
  findAllSpecies,
  findSpeciesById,
} from "../services/species.service.js";
import {
  BadRequestError,
  NotFoundError,
} from "../utils/errors/custom/client.errors.js";

export async function getAllSpecies(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const species = await findAllSpecies();

    if (!species) throw new NotFoundError("Oops! No species found");

    res.status(200).json(species);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getSpeciesById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id) || id <= 0)
      throw new BadRequestError("Oops! You entered an invalid species Id");

    const species = await findSpeciesById(id);

    if (!species) throw new NotFoundError("Oops! No species found");

    res.status(200).json(species);
  } catch (error) {
    console.error(error);
    next(error);
  }
}
