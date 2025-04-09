import mongoose from "mongoose";
import logger from "../utils/logger"
import { DB_URI } from "./envConstants"

async function connect(): Promise<mongoose.Mongoose> {
  try {
    logger.info("DB: Mongodb connection succeeded");
    return mongoose.connect(DB_URI);
  }
  
  catch (error) {
    logger.error("DB: Mongodb connection failed:\n" + error);
    process.exit(1);
  }
}

export default connect;