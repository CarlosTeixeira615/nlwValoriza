import { getCustomRepository } from "typeorm";
import UsersRepositories from "../respositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
  email: string;
  password: string;
}
class AuthenticateUserSevice {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({
      email,
    });

    if (!user) {
      throw new Error("Email/Password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }
    //nlwCarlosValoriza hash md5

    const token = sign(
      { email: user.email },
      "5bbbc6fc32b425c9421f0fab5647f8b4",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );
    return token;
  }
}
export { AuthenticateUserSevice };
