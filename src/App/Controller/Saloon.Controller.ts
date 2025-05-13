import { Router, Request, Response } from "express";
import UserService from "../Service/User.Service";
import handleAsyncController from "../../utils/asyncControllerHandler";
import SaloonService from "../Service/Saloon.Service";
import { CREATED, OK } from "../../constants/http";
import mongoose from "mongoose";
import { messageSchema } from "../Model/Message.Model";
import MessageService from "../Service/Message.Service";
import MessageDTO from "../Model/Message.Model";
import { saloonSchema } from "../Model/Saloon.Model";
import socketManager from "../../utils/socketManager";

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
      )
      .post("/:saloonId/join",
        handleAsyncController(async (req: Request, res: Response) => await this.joinSaloon(req, res))
      )
      .post("/:saloonId/leave",
        handleAsyncController(async (req: Request, res: Response) => await this.leaveSaloon(req, res))
      );

    return this.router;
  }

  async createSaloon(req: Request, res: Response) {
    const data = saloonSchema.parse(req.body);
    const saloon = await this.saloonService.createSaloon(data);
    
    // Notifier tous les utilisateurs de la création d'un nouveau salon
    socketManager.broadcastMessage('new-saloon', saloon);
    
    res.status(OK).json(saloon);
  }

  async findAll(req: Request, res: Response): Promise<void> {
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

    // Le message est déjà envoyé via Socket.IO dans le MessageService
    
    res.status(CREATED).json({ message: 'Message sent', data: message });
  }

  async getMessages(req: Request, res: Response): Promise<void> {
    const { saloonId } = req.params;
    const messages = await this.messageService.findBySaloonId(new mongoose.Types.ObjectId(saloonId));
    res.status(OK).json(messages);
  }
  
  async joinSaloon(req: Request, res: Response): Promise<void> {
    const { saloonId } = req.params;
    const { userId } = req.body;
    
    // Vérifier que le salon existe
    const saloon = await this.saloonService.findById(new mongoose.Types.ObjectId(saloonId));
    if (!saloon) { throw new Error("SaloonEntity: No entity found corresponding to these creterias.")};
    
    // Vérifier que l'utilisateur existe
    const user = await this.userService.findById(userId);
    if (!user) { throw new Error("UserEntity: No entity found corresponding to these creterias.")};
    
    // Notifier les autres utilisateurs du salon qu'un nouvel utilisateur a rejoint
    socketManager.sendMessageToSaloon(
      saloonId,
      'user-joined',
      { userId, pseudo: user.pseudo }
    );
    
    res.status(OK).json({ message: 'Joined saloon successfully' });
  }
  
  async leaveSaloon(req: Request, res: Response): Promise<void> {
    const { saloonId } = req.params;
    const { userId } = req.body;
    
    // Vérifier que le salon existe
    const saloon = await this.saloonService.findById(new mongoose.Types.ObjectId(saloonId));
    if (!saloon) { throw new Error("SaloonEntity: No entity found corresponding to these creterias.")};
    
    // Vérifier que l'utilisateur existe
    const user = await this.userService.findById(userId);
    if (!user) { throw new Error("UserEntity: No entity found corresponding to these creterias.")};
    
    // Notifier les autres utilisateurs du salon qu'un utilisateur a quitté
    socketManager.sendMessageToSaloon(
      saloonId,
      'user-left',
      { userId, pseudo: user.pseudo }
    );
    
    res.status(OK).json({ message: 'Left saloon successfully' });
  }
}
