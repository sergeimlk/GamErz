import { Router, Request, Response } from "express";
import { RoleController } from "../controllers/RoleController";
import setRole from "../models/RoleModel";

const router: Router = Router();

setRole();

const roleController: RoleController = new RoleController();

router.get("/", (req: Request, res: Response) => roleController.getRoles(req, res));

export default router;
