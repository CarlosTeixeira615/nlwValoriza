import { getCustomRepository } from "typeorm";
import UsersRepositories from "../respositories/UsersRepositories";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
}

export default class CreateUserService {
  async execute({ email, name, admin }: IUserRequest) {
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

    const user = usersRepository.create({
      name,
      email,
      admin,
    });

    await usersRepository.save(user);

    return user;
  }
}
