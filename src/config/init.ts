import express from "express";
import { FRONT_URL } from "./envConstants";
import errorHandler from "../middlewares/errorHandler";
import handleAsyncController from "../utils/asyncControllerHandler";
import cookieParser from "cookie-parser";
import cors from "cors";
import { OK } from "./httpConstants";
import dependencies from "./dependenciesManager";


export default function init() {
  const app = express();
  const deps = dependencies;
  
  app.use(express.json());
  app.use(express.urlencoded({extended: true}))
  app.use(cookieParser());
  app.use(cors({
    origin: FRONT_URL,
    credentials: true
  }));
  
  app.get("/", handleAsyncController(async (_, res) => {
    res.status(OK).json({ status: 'healthy' });
  }))
  
  app.use("/api", deps.get("mainRouter").initRoutes())
  app.use(errorHandler);

  return app;
}
