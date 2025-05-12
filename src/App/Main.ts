import logger from "../utils/logger";
import { SERVER_PORT } from "../constants/env";
import dbConnect from "../utils/database";
import { Application } from "express";

export default class App {
  static run(app: Application) {
    try {
      dbConnect().then(() => {
        app.listen(SERVER_PORT, async (error) => {
          if (error) {
            throw error;
          }
          logger.info(`Server: App running at http://localhost: ${SERVER_PORT}`)
        });
      });
    }
    
    catch (error) {
      logger.error(`Server: App launch failed.\n${error}`)
    }
  }
}