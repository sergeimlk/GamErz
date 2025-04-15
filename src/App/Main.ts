import logger from "../utils/logger";
import { SERVER_PORT } from "../constants/env";
import dbConnect from "../config/database";
import init from "./init";

class App {
  static run() {
    try {
      const app = init();
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
