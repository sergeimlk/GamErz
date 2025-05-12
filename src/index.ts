import express, { Application } from "express";
import App from "./App/Main";
import errorHandler from "./middlewares/errorHandler";
import handleAsyncController from "./utils/asyncControllerHandler";
import cookieParser from "cookie-parser";
import cors from "cors";
import mainRouter from "./utils/dependenciesManager";
import { FRONT_URL } from "./constants/env";
import { OK } from "./constants/http";

function init(): Application {
  const server = express();

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser());
  server.use(
    cors({
      origin: FRONT_URL,
      credentials: true,
    })
  );

  server.get(
    "/",
    handleAsyncController(async (_, res) => {
      res.status(OK).json({ status: "healthy" });
    })
  );

  server.use("/api", mainRouter.initRoutes());
  server.use(errorHandler);

  return server;
}

const server = init();
App.run(server);
