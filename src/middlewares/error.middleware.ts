import { NextFunction, Request, Response } from "express";
import HttpError from "../interfaces/error/error.interface.js";
import { BaseHttpError } from "../utils/errors/custom.error.js";

export const errorMiddleware = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) next();

  if (err instanceof BaseHttpError) {
    const { message, name, status } = err;

    res.status(status).json({ name: name, message: message });
  }

  res.status(500).json({
    name: "Internal Server Error",
    message: "Oops, something went wrong",
  });
};
