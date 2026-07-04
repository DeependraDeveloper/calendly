import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db.js";
import { badRequest, unauthorized } from "../utilities/api-error.js";

export const userAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const headers = req.headers["x-user-id"];

  if (!headers) throw unauthorized("x-user-id header is required");

  const userId = Number(headers);

  if (Number.isNaN(userId)) throw badRequest("x-user-id must a valid number");

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) throw badRequest("user not found");

  req.userId = userId;

  next();
};
