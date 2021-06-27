import { getCustomRepository } from "typeorm";
import UsersRepositories from "../respositories/UsersRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

export default class CreateUserService {
  async execute({ email, name, admin = false, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);
    const userAlreaddyExist = await usersRepository.findOne({
      email,
    });

    if (!email) {
      throw new Error("Email incorreto");
    }
    if (userAlreaddyExist) {
      throw new Error("user already exist ");
    }

    const passwordHash = await hash(password, 9);

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    });

    await usersRepository.save(user);

    delete user.password;
    return user;
  }
}
