import logger from "../utils/logger";
import { SERVER_PORT } from "../constants/env";
import dbConnect from "../utils/database";
import { Application } from "express";
import { Server as HttpServer } from "http";

export default class App {
  static run(app: Application, httpServer: HttpServer) {
    try {
      dbConnect().then(() => {
        httpServer.listen(SERVER_PORT, () => {
          logger.info(`Server: App running at http://localhost:${SERVER_PORT}`)
        });
      });
    }
    
    catch (error) {
      logger.error(`Server: App launch failed.\n${error}`)
    }
  }
}