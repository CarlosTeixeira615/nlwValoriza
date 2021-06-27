import { Request, Response } from "express";
import CreateTagsServices from "../services/CreateTagsServices";

export default class CreateTagController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;
    const createTagsService = new CreateTagsServices();
    const user = await createTagsService.execute({ name });
    return res.json(user);
  }
}
