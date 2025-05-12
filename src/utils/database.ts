import mongoose from "mongoose";
import logger from "./logger"
import { DB_URI } from "../constants/env"

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