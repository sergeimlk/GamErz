import { SALT_ROUNDS } from "../config/envConstants";
import UserRepository from "../DAOs/User.Repository";
import { UserDTO } from "../models/User.Model";
import bcrypt from "bcrypt";

export default class AuthenticationService {
  constructor(private userRepository: UserRepository) {}

  async createUser(user: Partial<UserDTO>): Promise<UserDTO> {
    if (!user.password) {
      throw new Error("UserCreation: Password is required");
    }

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

  async checkPassword({ pseudo, password, email }: Partial<UserDTO>): Promise<boolean> {
    if (!password || !(email || pseudo)) {
      throw new Error("PasswordCheck: pseudo or email are needed to authenticate user as well as password.");
    }
    const user = await this.userRepository.findByEmailOrPseudo(pseudo as string, email as string);
    const passwordToCheck = await this.encryptPassword(password);
    const isValidPassword = await bcrypt.compare(passwordToCheck, user.password);
    return isValidPassword;
  }
}
