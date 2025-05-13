import { Request, Response, Router } from "express";
import RoleService from "../Service/Role.Service";
import { OK } from "../../constants/http";
import handleAsyncController from "../../utils/asyncControllerHandler";

export default class RoleController {
  private router: Router;

  constructor(private roleService: RoleService) {
    this.router = Router();
  }

  handleRoles(): Router {
    this.router.get("/",
      handleAsyncController(async (req: Request, res: Response) => await this.findAll(req, res))
    );

    return this.router;
  }

  async findAll(req: Request, res: Response): Promise<void> {
    const roles = await this.roleService.findAll();
    res.status(OK).json(roles);
  }
}
