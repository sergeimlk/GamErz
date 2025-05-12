import { ErrorRequestHandler } from "express";
import { INTERNAL_SERVER_ERROR } from "../constants/http";
import logger from "../utils/logger";

const errorHandler: ErrorRequestHandler = (error, req, res, _) => {
  logger.error(`PATH: ${req.path}\n${error}`);
  res.status(INTERNAL_SERVER_ERROR).send("Internal server error.");
}

export default errorHandler;
