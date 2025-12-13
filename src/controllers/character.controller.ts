import { NextFunction, Request, Response } from "express";
import * as services from "../services/character.service.js";
import { NotFoundError } from "../utils/errors/custom/client.errors.js";
import { PopulatedCharacter } from "../interfaces/entities/character.interface.js";
import {
  formatCharacter,
  formatCharacters,
} from "../utils/format/cleanCharacters.format.js";

export async function getAllCharacters(
  req: Request,
  res: Response<PopulatedCharacter[]>,
  next: NextFunction
): Promise<void> {
  try {
    const characters = await services.findAllCharacters();

    if (!characters || characters.length === 0)
      throw new NotFoundError("No characters found");

    const cleanCharacters = formatCharacters(characters);

    res.status(200).json(cleanCharacters);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}

export async function getCharacterById(
  req: Request,
  res: Response<PopulatedCharacter>,
  next: NextFunction
): Promise<void> {
  try {
    const id = req.params.id;
    const character = await services.findCharacterById(parseInt(id));

    if (!character) throw new NotFoundError("No character found");

    const cleanCharacter = formatCharacter(character);

    res.status(200).json(cleanCharacter);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}
