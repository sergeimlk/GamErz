import { Router } from "express";
import UserService from "../Service/User.Service";
import handleAsyncController from "../../utils/asyncControllerHandler";
import SaloonService from "../Service/Saloon.Service";

export default class SaloonController {
  private router: Router;

  constructor(
    private saloonService: SaloonService,
    private userService: UserService
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
    const { senderId, content } = req.body;

    try {
      const saloon = await Saloon.findById(saloonId);
      if (!saloon) return res.status(404).json({ error: 'Saloon introuvable' });

      const sender = await User.findById(senderId);
      if (!sender) return res.status(404).json({ error: 'Expéditeur inconnu' });

      const message = new Message({
        saloon: saloonId,
        sender: senderId,
        content
      });

      await message.save();

      res.status(201).json({ message: 'Message envoyé', data: message });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
}