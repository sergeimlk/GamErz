import { Router, Request, Response } from "express";
import { UserController } from "../controllers/UserController";

const router: Router = Router();
const userController: UserController = new UserController();

router.get("/", (req: Request, res: Response) => userController.getUsers(req, res));
router.post("/register", (req: Request, res: Response) => userController.registerUser(req, res));
router.get("/:id", (req: Request, res: Response) => userController.getUserById(req, res));

export default router;
