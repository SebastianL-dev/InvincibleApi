import { Request, Response } from "express";
import * as services from "../services/character.service.js";

export async function getAllCharacters(req: Request, res: Response) {
  try {
    const Characters = await services.getAllCharacters();

    res.status(200).json(Characters);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
