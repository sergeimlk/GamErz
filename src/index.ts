import express, { Application } from "express";
import { createServer } from "http";
import App from "./App/Main";
import errorHandler from "./middlewares/errorHandler";
import handleAsyncController from "./utils/asyncControllerHandler";
import cookieParser from "cookie-parser";
import cors from "cors";
import mainRouter from "./utils/dependenciesManager";
import { FRONT_URL } from "./constants/env";
import { OK } from "./constants/http";
import socketManager from "./utils/socketManager";

function init(): { app: Application, server: any } {
  const app = express();
  const httpServer = createServer(app);

  // Initialiser Socket.IO avec le serveur HTTP
  socketManager.initialize(httpServer);

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

  return { app, server: httpServer };
}

const { app, server } = init();
App.run(app, server);
