import SaloonModel, { SaloonDTO } from "../Model/Saloon.Model";
import { AbstractCrudRepository } from "./AbstractCrud.Repository";


export default class SaloonRepository extends AbstractCrudRepository<SaloonDTO> {
  constructor() {
    super(SaloonModel);
  }
}