import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import UsersRepositories from "../respositories/UsersRepositories";

export default async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user_id } = req;

  const usersRepositoriores = getCustomRepository(UsersRepositories);
  const { admin } = await usersRepositoriores.findOne(user_id);

  if (admin) {
    return next();
  }
  return res.status(401).json({
    error: "User is not admin",
  });
}
