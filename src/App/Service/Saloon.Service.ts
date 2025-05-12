import MessageRepository from "../DAO/Message.Repository";
import SaloonRepository from "../DAO/SaloonRepository";
import { SaloonDTO } from "../Model/Saloon.Model";


export default class SaloonService {
  constructor(
    private saloonRepository: SaloonRepository,
    private messageRepository: MessageRepository
  ) {}

  async findById(saloon: Partial<SaloonDTO>) {
    if (saloon._id) {
      return this.saloonRepository.findById(saloon._id);
    }

  }
}