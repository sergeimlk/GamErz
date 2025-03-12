import { Request, Response } from "express";
import UserModel from "../models/IUser";

export class UserController {
  async getUsers(req: Request, res: Response): Promise<void> {
    const query = UserModel.find({});
    const data = await query.exec();
    res.send(data);
  }
  async registerUser(req: Request, res: Response): Promise<void> {
    console.log(req.body);
    res.send(req.body);
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    console.log(req.params.id);
  }
}
