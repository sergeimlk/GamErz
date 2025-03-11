import { Router } from "express";
import ApplicationRoutes from "./ApplicationRoutes";

const router: Router = Router();
router.use("/application", ApplicationRoutes);

export default router;
