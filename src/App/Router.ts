import { Router } from "express";
import AuthenticationController from "./Controller/Authentication.Controller";
import RoleController from "./Controller/Role.Controller";
import SaloonController from "./Controller/Saloon.Controller";

export default class MainRouter {
  router: Router;

  constructor(
    private roleController: RoleController,
    private authenticationController: AuthenticationController,
    private saloonController: SaloonController
  ) {
    this.router = Router();
  }

  initRoutes(): Router {
    const authHandler = this.authenticationController.handleAuthentication();
    const rolesHandler = this.roleController.handleRoles();

    this.router.use("/auth", authHandler);
    this.router.use("/roles", rolesHandler);
    this.router.use("/saloon", )

    return this.router;
  }
}
