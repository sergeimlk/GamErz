import { Request, Response, Router } from "express";
import RoleService from "../services/Role.Service";
import { OK } from "../config/httpConstants";
import handleAsyncController from "../utils/asyncControllerHandler";
import { userRegistrationSchema } from "../models/User.Model";

export default class RoleController {
  private router: Router;

  constructor(private roleService: RoleService) {
    this.router = Router();
    this.findAll = this.findAll.bind(this);
  }

  handleRoles(): Router {
    this.router.post("/all", handleAsyncController(this.findAll));
    return this.router;
  }

  async findAll(req: Request, res: Response): Promise<void> {
    const roles = await this.roleService.findAll();
    res.status(OK).json(roles);
  }
}
