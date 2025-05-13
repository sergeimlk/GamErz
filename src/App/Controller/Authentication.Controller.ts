import { CookieOptions, Request, Response, Router } from "express";
import AuthenticationService from "../Service/Authentication.Service";
import { BAD_REQUEST, CREATED, OK } from "../../constants/http";
import handleAsyncController from "../../utils/asyncControllerHandler";
import { UserDTO, userRegistrationSchema } from "../Model/User.Model";
import UserService from "../Service/User.Service";
import { sessionValidationSchema } from "../Model/Session.Model";

export default class AuthenticationController {
  private router: Router;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.router = Router();
  }

  handleAuthentication(): Router {
    this.router
      .post("/register",
        handleAsyncController(async (req: Request, res: Response) => await this.register(req, res))
      )
      .post("/login",
        handleAsyncController(async (req: Request, res: Response) => await this.login(req, res))
      );

    return this.router;
  }

  async register(req: Request, res: Response): Promise<void> {
    const { confirmationPassword, motivation, ...userData } = userRegistrationSchema.parse(req.body);
    try {
      const existingUser = await this.userService.findByEmail(userData.email);
      res.status(BAD_REQUEST).json({
        error: "User already exist.",
        user: existingUser
      });
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes("No user found")) {
        const userSaved = await this.userService.createUser(userData as UserDTO);
        res.status(OK).json(userSaved); return;
      }

      throw err;
    }
  }

  async login(req: Request, res: Response): Promise<any> {
    const userAgent = req.headers["user-agent"];
    const loginData = sessionValidationSchema.parse({...req.body, userAgent});
    
    const isValidPassword = await this.userService.checkPassword(loginData);
    if (!isValidPassword) {
      throw new Error("PasswordCheck: Invalid password.");
    }

    const userSession = await this.userService.findByEmail(loginData.email);
    const { accessToken, refreshToken } = await this.authenticationService.login(
      { userId: userSession._id, userAgent: userAgent }
    );

    const accessTokenCookieOptions = this.authenticationService.getCookieOptions("accessToken");
    const refreshTokenCookieOptions = this.authenticationService.getCookieOptions("refreshToken");
    return res
      .cookie("accessToken", accessToken, accessTokenCookieOptions)
      .cookie("refreshToken", refreshToken, {
        ...refreshTokenCookieOptions,
        path: "/login/refresh"
      })
      .status(CREATED)
      .json(userSession);
  }
}
