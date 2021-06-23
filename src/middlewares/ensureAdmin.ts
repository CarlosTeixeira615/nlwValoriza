import { NextFunction, Request, Response } from "express";

export default function unsureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const admin = true;
  if (admin) {
    return next();
  }
  return res.status(401).json({
    error: "User is not admin",
  });
}
