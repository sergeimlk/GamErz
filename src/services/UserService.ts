import UserModel, { IUser } from "../models/UserModel";
import UserRepository from "../daos/UserRepository";

class UserService {
  userRepository: UserRepository;

  constructor(UserRepository: UserRepository) {
    this.userRepository = UserRepository;
  }

  async createUser(user: Partial<IUser>) {
    const newUser = new UserModel(user);
    const userSaved = await this.userRepository.createUser(newUser);
    return userSaved;
  }
}

export default UserService;
