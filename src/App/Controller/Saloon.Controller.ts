import { Router, Request, Response } from "express";
import UserService from "../Service/User.Service";
import handleAsyncController from "../../utils/asyncControllerHandler";
import SaloonService from "../Service/Saloon.Service";
import { CREATED, INTERNAL_SERVER_ERROR, OK } from "../../constants/http";
import mongoose from "mongoose";
import { messageSchema } from "../Model/Message.Model";
import MessageService from "../Service/Message.Service";
import MessageDTO from "../Model/Message.Model";
import { saloonSchema } from "../Model/Saloon.Model";

export default class SaloonController {
  private router: Router;

  constructor(
    private saloonService: SaloonService,
    private userService: UserService,
    private messageService: MessageService
  ) {
    this.router = Router();
  }

  handleSaloon(): Router {
    this.router
      .get("/",
        handleAsyncController(async (req: Request, res: Response) => await this.findAll(req, res))
      )
      .post("/",
        handleAsyncController(async (req: Request, res: Response) => await this.createSaloon(req, res))
      )
      .post("/:saloonId/messages",
        handleAsyncController(async (req: Request, res: Response) => await this.sendMessage(req, res))
      )
      .get("/:saloonId/messages",
        handleAsyncController(async (req: Request, res: Response) => await this.getMessages(req, res))
      );

    return this.router;
  }

  async createSaloon(req: Request, res: Response) {
    const data = saloonSchema.parse(req.body);
    const saloon = await this.saloonService.createSaloon(data);
    res.status(OK).json(saloon);
  }

  async findAll(_: any, res: Response): Promise<void> {
    const saloons = await this.saloonService.findAll();
    res.status(OK).json(saloons);
  }

  async sendMessage(req: Request, res: Response): Promise<void> {
    const { saloonId } = req.params;
    const { senderId, content } = messageSchema.parse(req.body);

    const saloon = await this.saloonService.findById(new mongoose.Types.ObjectId(saloonId));
    if (!saloon) { throw new Error("SaloonEntity: No entity found corresponding to these creterias.")};

    const sender = await this.userService.findById(senderId);
    if (!sender) { throw new Error("UserEntity: No entity found corresponding to these creterias.")};

    const message = await this.messageService.createMessage(new MessageDTO({
      saloonId: saloon._id,
      senderId,
      content
    }));

    res.status(CREATED).json({ message: 'Message sent', data: message });
  }

  async getMessages(req: Request, res: Response): Promise<void> {
    const { saloonId } = req.params;
    const messages = await this.messageService.findBySaloonId(new mongoose.Types.ObjectId(saloonId));
    res.status(OK).json(messages);
  }
}
