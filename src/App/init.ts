import express, { Application } from "express";
import errorHandler from "../utils/middlewares/errorHandler";
import handleAsyncController from "../utils/asyncControllerHandler";
import cookieParser from "cookie-parser";
import cors from "cors";
import mainRouter from "../config/dependenciesManager";
import { FRONT_URL } from "../constants/env";
import { OK } from "../constants/http";

export default function init(): Application {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    cors({
      origin: FRONT_URL,
      credentials: true,
    })
  );

  app.get(
    "/",
    handleAsyncController(async (_, res) => {
      res.status(OK).json({ status: "healthy" });
    })
  );

  app.use("/api", mainRouter.initRoutes());
  app.use(errorHandler);

  return app;
}
