import { Request, Response, Router } from "express";
import AuthenticationService from "../services/Authentication.Service";
import { OK } from "../config/httpConstants";
import handleAsyncController from "../utils/asyncControllerHandler";
import { userRegistrationSchema } from "../models/User.Model";

export default class AuthenticationController {
  private router: Router;

  constructor(private authenticationService: AuthenticationService) {
    this.router = Router();
    this.register = this.register.bind(this);
  }

  handleAuthentication(): Router {
    this.router.post("/register", handleAsyncController(this.register));
    return this.router;
  }

  async register(req: Request, res: Response): Promise<void> {
    const userData = userRegistrationSchema.parse(req.body);
    const userSaved = await this.authenticationService.createUser(userData);
    res.status(OK).json(userSaved);
  }
}
