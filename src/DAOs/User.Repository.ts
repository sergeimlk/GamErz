import { UserModel, UserDTO } from "../models/User.Model";
import { AbstractCrudRepository } from "./AbstractCrud.Repository";

class UserRepository extends AbstractCrudRepository<UserDTO> {
  constructor() {
    super(UserModel);
  }

  async createUser(data: Partial<UserDTO>): Promise<UserDTO> {
    const user = new this.model(data);
    const userSaved = user.save();
    return userSaved;
  }
}

export default UserRepository;