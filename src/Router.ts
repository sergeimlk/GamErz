import { Router } from "express";
import AuthenticationController from "./controllers/Authentication.Controller";


export default class MainRouter {
  router: Router;

  constructor(
    private authenticationController: AuthenticationController
  ) {
    this.router = Router();
  }

  initRoutes(): Router {
    const authHandler = this.authenticationController.handleAuthentication();

    this.router.use("/auth", authHandler);

    return this.router;
  }
}
