import { Request, Response } from "express";
import RoleService from "../services/Role.Service";

export class RoleController {
  roleService: RoleService;

  constructor(roleService: RoleService) {
    this.roleService = roleService;
  }

  async getRoles(_: Request, res: Response): Promise<void> {
    const data = await this.roleService.findAll();
    res.send(data);
  }
}
