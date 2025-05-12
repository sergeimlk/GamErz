import MessageRepository from "../DAO/Message.Repository";
import { MessageDTO } from "../Model/Message.Model";
import mongoose from "mongoose";

export default class MessageService {
  constructor(private messageRepository: MessageRepository) {}

  async findById(id: mongoose.Types.ObjectId) {
    const messageFound = await this.messageRepository.findById(id);
    return messageFound;
  }

  async createMessage(message: MessageDTO): Promise<MessageDTO> {
    const messageSaved = await this.messageRepository.createMessage(message);
    return messageSaved;
  }

  async findBySaloonId(saloonId: mongoose.Types.ObjectId, latest?: boolean): Promise<Array<MessageDTO>> {
    const messages = await this.messageRepository.findBySaloonId(saloonId, latest);
    return messages;
  }
}
