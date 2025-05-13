import mongoose from "mongoose";
import SaloonRepository from "../DAO/SaloonRepository";
import { SaloonDTO } from "../Model/Saloon.Model";


export default class SaloonService {
  constructor(
    private saloonRepository: SaloonRepository,
  ) {}

  async findById(saloonId: mongoose.Types.ObjectId): Promise<SaloonDTO> {
    const saloonFound = await this.saloonRepository.findById(saloonId);
    if (!saloonFound) {
      throw new Error('Saloon not found');
    }
    return saloonFound;
  }

  async findAll(): Promise<Array<SaloonDTO>> {
    return await this.saloonRepository.findAll();
  }

  async createSaloon(saloonDTO: Partial<SaloonDTO>): Promise<SaloonDTO> {
    return await this.saloonRepository.createSaloon(saloonDTO);
  }
}