import { Router, Request, Response } from "express";
import { ApplicationController } from "../controllers/ApplicationController";

const router: Router = Router();
const applicationController: ApplicationController = new ApplicationController();

router.get("/", (req: Request, res: Response) => applicationController.getApplication(req, res));

export default router;
