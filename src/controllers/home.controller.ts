import { NextFunction, Request, Response } from "express";
import Home from "../interfaces/home.interface.js";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Get current base url
    const baseUrl = `${req.protocol}://${req.get("host")}/api`;

    // Routes availables to use
    const routes: Home = {
      characters: `${baseUrl}/characters`,
      species: `${baseUrl}/species`,
      locations: `${baseUrl}/locations`,
    };

    res.status(200).json(routes);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}
