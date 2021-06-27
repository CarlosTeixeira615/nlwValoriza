import { getCustomRepository } from "typeorm";
import ComplimentsRepositories from "../respositories/ComplimentsRepositories";
import UsersRepositories from "../respositories/UsersRepositories";

interface IReqCompliment {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

export default class CreateComplimentService {
  async execute({
    message,
    tag_id,
    user_receiver,
    user_sender,
  }: IReqCompliment) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );
    const usersRepositorie = getCustomRepository(UsersRepositories);

    if (user_sender === user_receiver) {
      throw new Error("Incorrect User Receiver!");
    }

    const userReceiverExist = await usersRepositorie.findOne(user_receiver);

    if (!userReceiverExist) {
      throw new Error("User receiver does not exists!");
    }

    const compliment = complimentsRepositories.create({
      message,
      tag_id,
      user_receiver,
      user_sender,
    });

    await complimentsRepositories.save(compliment);

    return compliment;
  }
}
