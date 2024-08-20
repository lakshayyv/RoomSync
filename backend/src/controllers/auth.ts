import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middlewares/CatchAsyncError";

const controller = {
  fetchAuth: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = req.user;
      const admin = req.admin;

      if (!user && !admin) {
        return res.status(200).json({
          success: true,
          authorized: false,
        });
      }

      return res.status(200).json({
        success: true,
        authorized: true,
      });
    }
  ),
};

export default controller;
