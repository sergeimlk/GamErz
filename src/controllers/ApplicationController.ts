import { Request, Response } from "express";

export class ApplicationController {
  async getApplication(req: Request, res: Response): Promise<void> {
    res.send("Hello World");
  }
}
