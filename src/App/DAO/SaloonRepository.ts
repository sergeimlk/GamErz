import SaloonModel, { SaloonDTO } from "../Model/Saloon.Model";
import { AbstractCrudRepository } from "./AbstractCrud.Repository";


export default class SaloonRepository extends AbstractCrudRepository<SaloonDTO> {
  constructor() {
    super(SaloonModel);
  }

  async createSaloon(data: Partial<SaloonDTO>): Promise<SaloonDTO> {
    const saloon = this.model.create(data);
    return saloon;
  }
}