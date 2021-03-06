import { getCustomRepository } from "typeorm";

import ComplimentsRepositories from "../respositories/ComplimentsRepositories";

class ListUserReceiveComplimentsService {
  async execute(user_id: string) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );

    const compliments = await complimentsRepositories.find({
      where: {
        user_receiver: user_id,
      },
    });
    console.log(compliments);
    console.log(user_id);
    return compliments;
  }
}

export { ListUserReceiveComplimentsService };
