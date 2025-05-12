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
    // const authHandler = this.authenticationController.handleAuthentication();
    // const rolesHandler = this.roleController.handleRoles();
    // const saloonMessagesHandler = this.saloonController.handleSaloonMessages();

    this.router.use("/auth", this.authenticationController.handleAuthentication());
    this.router.use("/roles", this.roleController.handleRoles());
    this.router.use("/saloon", this.saloonController.handleSaloonMessages());

    return this.router;
  }
}
