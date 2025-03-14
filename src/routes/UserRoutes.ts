import { Router, Request, Response } from "express";
import { UserController } from "../controllers/UserController";
import UserService from "../services/UserService";
import UserRepository from "../daos/UserRepository";

const router: Router = Router();

const userRepository: UserRepository = new UserRepository();

const userService: UserService = new UserService(userRepository);

const userController: UserController = new UserController(userService);

router.get("/", (req: Request, res: Response) => userController.getUsers(req, res));
router.post("/register", (req: Request, res: Response) => userController.registerUser(req, res));
router.get("/:id", (req: Request, res: Response) => userController.getUserById(req, res));

export default router;
