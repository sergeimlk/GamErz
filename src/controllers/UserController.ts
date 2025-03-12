import { Request, Response } from "express";
import UserModel from "../models/IUser";

export class UserController {
  async getUsers(req: Request, res: Response): Promise<void> {
    const query = UserModel.find({});
    const data = await query.exec();
    res.send(data);
  }
}
