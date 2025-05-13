import MessageRepository from "../DAO/Message.Repository";
import { MessageDTO } from "../Model/Message.Model";
import mongoose from "mongoose";
import socketManager from "../../utils/socketManager";

export default class MessageService {
  constructor(private messageRepository: MessageRepository) {}

  async findById(id: mongoose.Types.ObjectId) {
    const messageFound = await this.messageRepository.findById(id);
    return messageFound;
  }

  async createMessage(message: MessageDTO): Promise<MessageDTO> {
    const messageSaved = await this.messageRepository.createMessage(message);
    
    // Envoyer le message via Socket.IO au salon correspondant
    socketManager.sendMessageToSaloon(
      messageSaved.saloonId.toString(),
      'new-message',
      messageSaved
    );
    
    return messageSaved;
  }

  async findBySaloonId(saloonId: mongoose.Types.ObjectId, latest?: boolean): Promise<Array<MessageDTO>> {
    const messages = await this.messageRepository.findBySaloonId(saloonId, latest);
    return messages;
  }
}
