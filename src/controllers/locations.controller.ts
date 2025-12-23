import { NextFunction, Request, Response } from "express";
import {
  findAllLocations,
  findLocationById,
} from "../services/locations.service.js";
import {
  BadRequestError,
  NotFoundError,
} from "../utils/errors/custom/client.errors.js";

export async function getAllLocations(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const locations = await findAllLocations();

    if (!locations || locations.length === 0)
      throw new NotFoundError("Oops! No locations found");

    res.status(200).json(locations);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getLocationById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id) || id <= 0)
      throw new BadRequestError("Oops! Your entered an invalid location Id");

    const location = await findLocationById(id);

    if (!location) throw new NotFoundError("Oops! No location found");

    res.status(200).json(location);
  } catch (error) {
    console.error(error);
    next(error);
  }
}
