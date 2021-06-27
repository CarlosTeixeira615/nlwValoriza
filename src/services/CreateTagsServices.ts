import { getCustomRepository } from "typeorm";
import TagsRepositories from "../respositories/TagsRepositories";

interface IReqTag {
  name: string;
}

export default class CreateTagsServices {
  async execute({ name }: IReqTag) {
    if (!name) {
      throw new Error("Iconrrect name!");
    }
    const tagsRepository = getCustomRepository(TagsRepositories);
    const tagAlreaddyExist = await tagsRepository.findOne({
      name,
    });

    if (tagAlreaddyExist) {
      throw new Error("tag already exist ");
    }

    const tag = tagsRepository.create({
      name,
    });

    await tagsRepository.save(tag);

    return tag;
  }
}
