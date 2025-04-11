import { Request, Response, Router } from "express";
import AuthenticationService from "../services/Authentication.Service";
import { OK } from "../config/httpConstants";
import handleAsyncController from "../utils/asyncControllerHandler";
import { userRegistrationSchema } from "../models/User.Model";

export default class AuthenticationController {
  private router: Router;

  constructor(private authenticationService: AuthenticationService) {
    this.router = Router();
  }

  handleAuthentication(): Router {
    this.router
      .post(
        "/register",
        handleAsyncController((req: Request, res: Response) =>
          Promise.resolve(this.register(req, res))
        )
      )
      .post(
        "/login",
        handleAsyncController((req: Request, res: Response) =>
          Promise.resolve(this.login(req, res))
        )
      );

    return this.router;
  }

  async register(req: Request, res: Response): Promise<void> {
    const { confirmationPassword, motivation, ...userData} = userRegistrationSchema.parse(req.body);
    const userSaved = await this.authenticationService.createUser(userData);
    res.status(OK).json(userSaved);
  }

  async login(_: Request, res: Response): Promise<void> {
    res.status(OK).json({ message: "Login successful" });
  }
}
