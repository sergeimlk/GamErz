import { Router, Request, Response } from "express";
import UserService from "../Service/User.Service";
import handleAsyncController from "../../utils/asyncControllerHandler";
import SaloonService from "../Service/Saloon.Service";
import { BAD_REQUEST } from "../../constants/http";
import mongoose from "mongoose";
import { messageSchema } from "../Model/Message.Model";
import MessageService from "../Service/Message.Service";
import MessageDTO from "../Model/Message.Model";

export default class SaloonController {
  private router: Router;

  constructor(
    private saloonService: SaloonService,
    private userService: UserService,
    private messageService: MessageService
  ) {
    this.router = Router();
  }

  handleSaloonMessages(): Router {
    this.router
      .post(
        "/:saloonId/messages",
        handleAsyncController((req: Request, res: Response) =>
          Promise.resolve(this.sendMessage(req, res))
        )
      );
      // .get(
      //   "/:saloonId/messages",
      //   handleAsyncController((req: Request, res: Response) =>
      //     Promise.resolve(this.login(req, res))
      //   )
      // );

    return this.router;
  }

  async sendMessage(req: Request, res: Response): Promise<void> {
    const { saloonId } = req.params;
    const { senderId, content } = messageSchema.parse(req.body);

    try {
      const saloon = await this.saloonService.findById(new mongoose.Types.ObjectId(saloonId));
      if (!saloon) {res.status(BAD_REQUEST).json({ error: 'Saloon introuvable' })};

      const sender = await this.userService.findById(senderId);
      if (!sender) {res.status(BAD_REQUEST).json({ error: 'Expéditeur inconnu' })};

      const message = await this.messageService.createMessage(new MessageDTO({
        saloonId: saloon._id,
        senderId,
        content
      }));

      res.status(201).json({ message: 'Message envoyé', data: message });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
}