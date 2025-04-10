import { Request, Response, Router } from "express";
import RoleService from "../services/Role.Service";
import { OK } from "../config/httpConstants";
import handleAsyncController from "../utils/asyncControllerHandler";

export default class RoleController {
  private router: Router;

  constructor(private roleService: RoleService) {
    this.router = Router();
  }

  handleRoles(): Router {
    this.router
      .get("/",
        handleAsyncController((req: Request, res: Response) => Promise.resolve(this.findAll(req, res)))
      );

    return this.router;
  }

  async findAll(_: Request, res: Response): Promise<void> {
    console.log("test");
    const roles = await this.roleService.findAll();
    res.status(OK).json(roles);
  }
}
