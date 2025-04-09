import express, { Express } from "express";
import logger from "./utils/logger";
import { SERVER_PORT } from "./config/envConstants";
import dbConnect from "./config/database";
import init from "./config/init";

class App {
  static run() {
    try {
      const app: Express = init();
      app.listen(SERVER_PORT, async (error) => {
        if (error) {
          throw error;
        }

        await dbConnect();
        logger.info(`Server: App running at http://localhost: ${SERVER_PORT}`)
      });
    }
    
    catch (error) {
      logger.error(`Server: App launch failed.\n${error}`)
    }
  }
}

App.run();
