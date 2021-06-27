import { Request, Response } from "express";
import CreateComplimentService from "../services/CreateComplimentService";

export default class CreateComplimentControlle {
  async handle(req: Request, res: Response) {
    const { message, tag_id, user_receiver } = req.body;
    const { user_id } = req;
    const createComplimentService = new CreateComplimentService();
    const compliment = await createComplimentService.execute({
      message,
      tag_id,
      user_receiver,
      user_sender: user_id,
    });
    return res.json(compliment);
  }
}
