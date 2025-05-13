import mongoose from "mongoose";
import MessageModel, { MessageDTO } from "../Model/Message.Model";
import { AbstractCrudRepository } from "./AbstractCrud.Repository";

export default class MessageRepository extends AbstractCrudRepository<MessageDTO> {
  constructor() {
    super(MessageModel);
  }

  async findBySaloonId(saloonId: mongoose.Types.ObjectId, latest?: boolean): Promise<Array<MessageDTO>> {
    const messages = await this.model.find({ saloonId })
      .populate('senderId', 'name')
      .sort({ createdAt: (latest ? 1 : -1) })
      .limit(50);
    
    return messages;
  }

  async createMessage(message: MessageDTO): Promise<MessageDTO> {
    const messageSaved = await this.model.create(message);
    return messageSaved;
  }
} 