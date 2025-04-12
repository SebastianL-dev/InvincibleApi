import { NextFunction, Request, Response } from "express";
import HttpError from "../interfaces/error/error.interface";
import { BaseHttpError } from "../utils/errors/app.error";

/**
 * Middleware to handle errors in the application.
 *
 * @param {HttpError} err - The error object, expected to be an instance of `HttpError`.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 *
 * This middleware checks if the error is an instance of `BaseHttpError`.
 * If so, it extracts the `message`, `name`, and `status` properties from the error
 * and sends them as a JSON response with the appropriate HTTP status code.
 *
 * If the error is not an instance of `BaseHttpError`, it sends a generic
 * "Internal Server Error" response with a 500 status code.
 */
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
