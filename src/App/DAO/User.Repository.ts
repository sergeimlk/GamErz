import UserModel, { UserDTO } from "../Model/User.Model";
import { AbstractCrudRepository } from "./AbstractCrud.Repository";

class UserRepository extends AbstractCrudRepository<UserDTO> {
  constructor() {
    super(UserModel);
  }

  async createUser(data: Partial<UserDTO>): Promise<UserDTO> {
    const userSaved = this.model.create(data);
    return userSaved;
  }

  async findByEmail(email: string): Promise<UserDTO> {
    const user = await this.model.findOne({ email }).exec();
    if (!user) {
      throw new Error("UserEntity: No user found for the given informations.");
    }

    return user;
  }
}

export default UserRepository;
