import { SALT_ROUNDS } from "../config/envConstants";
import UserRepository from "../DAOs/User.Repository";
import { UserDTO } from "../models/User.Model";
import bcrypt from "bcrypt";

export default class AuthenticationService {
  constructor(private userRepository: UserRepository) {}

  async createUser(user: Partial<UserDTO>): Promise<UserDTO> {
    const password = (await this.encryptPassword(user)) as string;
    if (!password) {
      throw new Error("Failed to encrypt password");
    }
    user.password = password;

    const userSaved = await this.userRepository.createUser(user);
    return userSaved;
  }

  async encryptPassword(user: Partial<UserDTO>): Promise<string | void> {
    const saltRounds = SALT_ROUNDS;

    if (!user.password) {
      throw new Error("Password is required");
    }

    try {
      const salt = await bcrypt.genSalt(parseInt(saltRounds));
      const hash = await bcrypt.hash(user.password, salt);
      return hash;
    } catch (error) {
      throw new Error(`Failed to encrypt password: ${error}`);
    }
  }
}
