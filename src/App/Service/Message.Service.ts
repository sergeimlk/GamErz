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

}
