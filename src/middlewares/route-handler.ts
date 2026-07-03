import { Request, Response, NextFunction } from "express";
import { notFound } from "../utilities/api-error.js";

export const routeNotFound = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => next(notFound("Api not found!"));
