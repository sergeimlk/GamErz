import { InferSchemaType } from "mongoose";
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

  async findByEmailOrPseudo(pseudo: string, email: string): Promise<UserDTO | null> {
    const user = await this.model.findOne({ $or: [{ email }, { pseudo }] }).exec();
    return user;
  }

  toDTO(user: any): UserDTO {
    return {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      pseudo: user.pseudo,
      avatar: user.avatar,
      role_id: user.role_id._id,
    };
  }
}

export default UserRepository;
