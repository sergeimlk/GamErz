import { NextFunction, Request, Response } from "express";

export type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

const handleAsyncController = (controller: AsyncController): AsyncController => {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default handleAsyncController;
