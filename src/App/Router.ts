import { Router } from "express";
import AuthenticationController from "./Controller/Authentication.Controller";
import RoleController from "./Controller/Role.Controller";
import SaloonController from "./Controller/Saloon.Controller";

export default class MainRouter {
  private readonly router: Router;

  constructor(
    private roleController: RoleController,
    private authenticationController: AuthenticationController,
    private saloonController: SaloonController
  ) {
    this.router = Router();
  }

  initRoutes(): Router {
    this.router.use("/auth", this.authenticationController.handleAuthentication());
    this.router.use("/roles", this.roleController.handleRoles());
    this.router.use("/saloons", this.saloonController.handleSaloon());

    return this.router;
  }
}
