import UserModel, { IUser } from "../models/UserModel";
import UserRepository from "../daos/UserRepository";
import "dotenv/config";
import bcrypt from "bcrypt";

class UserService {
  userRepository: UserRepository;

  constructor(UserRepository: UserRepository) {
    this.userRepository = UserRepository;
  }

  async createUser(user: Partial<IUser>) {
    const password = (await this.encryptPassword(user)) as string;
    if (!password) {
      throw new Error("[Error] Failed to encrypt password");
    }
    user.password = password;
    const newUser = new UserModel(user);
    const userSaved = await this.userRepository.createUser(newUser);
    return userSaved;
  }

  async encryptPassword(user: Partial<IUser>): Promise<string | void> {
    const saltRounds = process.env.SALT_SEED;
    if (!saltRounds) {
      throw new Error("[Error] SALT_SEED is not defined");
    }

    if (!user.password) {
      throw new Error("[Error] Password is required");
    }

    try {
      const salt = await bcrypt.genSalt(parseInt(saltRounds));
      const hash = await bcrypt.hash(user.password, salt);
      return hash;
    } catch (error) {
      throw new Error(`[Error] Failed to encrypt password: ${error}`);
    }
  }
}

export default UserService;
