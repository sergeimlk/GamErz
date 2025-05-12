import { SALT_ROUNDS } from "../../constants/env";
import UserRepository from "../DAO/User.Repository";
import { UserDTO } from "../Model/User.Model";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export default class UserService {
  constructor(private userRepository: UserRepository) {}

  async findById(id: mongoose.Types.ObjectId) {
    const userFound = await this.userRepository.findById(id);
    return userFound;
  }

  async findByEmail(email: string) {
    const userFound = await this.userRepository.findByEmail(email);
    return userFound;
  }

  async createUser(user: UserDTO): Promise<UserDTO> {
    user.password = await this.encryptPassword(user.password);
    const userSaved = await this.userRepository.createUser(user);
    return userSaved;
  }

  async encryptPassword(password: string): Promise<string> {
    const saltRounds = SALT_ROUNDS;

    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {
      throw new Error(`PasswordEncryption: Failed to encrypt password.\n${error}`);
    }
  }

  async checkPassword({ password, email }: Partial<UserDTO>): Promise<boolean> {
    if (email && password) {
      const user = await this.userRepository.findByEmail(email);
      return await bcrypt.compare(password, user.password);
    }
    throw new Error("PasswordCheck: Email and Password are needed to authenticate the user.");
  }
}
