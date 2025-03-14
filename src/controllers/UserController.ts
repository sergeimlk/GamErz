import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import UserService from "src/services/UserService";

export class UserController {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    const query = UserModel.find({});
    const data = await query.exec();
    res.send(data);
  }

  async registerUser(req: Request, res: Response): Promise<void> {
    const userSaved = await this.userService.createUser(req.body);
    res.send(userSaved);
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    console.log(req.params.id);
  }
}
