import { Request, Response } from "express";
import RoleModel from "../models/IRole";

export class RoleController {
  async getRoles(req: Request, res: Response): Promise<void> {
    const query = RoleModel.find({});
    const data = await query.exec();
    res.send(data);
  }
}
