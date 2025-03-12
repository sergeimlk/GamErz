import { Router, Request, Response } from "express";
import { UserController } from "../controllers/UserController";

const router: Router = Router();
const userController: UserController = new UserController();

router.get("/", (req: Request, res: Response) => userController.getUsers(req, res));

export default router;
