import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(
      token,
      "5bbbc6fc32b425c9421f0fab5647f8b4"
    ) as IPayload;

    req.user_id = sub;
  } catch (error) {
    return res.status(401).end();
  }

  return next();
}
