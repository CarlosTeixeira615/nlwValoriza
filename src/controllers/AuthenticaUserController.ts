import { Request, Response } from "express";
import { AuthenticateUserSevice } from "../services/AuthenticateUserSevice";

class AuthenticaUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;
    const authenticateUserService = new AuthenticateUserSevice();

    const token = await authenticateUserService.execute({
      email,
      password,
    });
    return res.json(token);
  }
}

export { AuthenticaUserController };
