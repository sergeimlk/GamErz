import { Router } from "express";
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
    this.router.get("/", handleAsyncController(async (req, res) => {
      res.status(OK).send("Everything is doing well");
    }));
    return this.router;
  }

  async register(req: Request, res: Response) {
    const userData = userRegistrationSchema.parse(req.body);
    const userSaved = await this.authenticationService.createUser(userData);
  }
}
