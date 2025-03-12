import { Router } from "express";
import ApplicationRoutes from "./ApplicationRoutes";
import UserRoutes from "./UserRoutes";

const router: Router = Router();
router.use("/application", ApplicationRoutes);
router.use("/users", UserRoutes);

export default router;
