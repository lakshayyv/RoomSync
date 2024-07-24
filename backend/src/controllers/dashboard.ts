import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middlewares/CatchAsyncError";
import { prisma } from "../config/db";
import { ineligibleUser } from "../utils/helper";
import { ErrorHandler } from "../utils/errorHandler";

const controller = {
  // --USER

  fetchUser: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const invalidUser = await ineligibleUser();

      const response = await prisma.user.findMany({
        select: { id: true, name: true, email: true },
        where: { id: { notIn: invalidUser } },
      });

      if (response.length < 1) {
        const message: string = "No user for now";
        return next(new ErrorHandler(message, 404));
      }

      return res.status(200).json({
        success: true,
        message: response,
      });
    }
  ),

  // --ADMIN

  fetchUserAdmin: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {

      const response = await prisma.user.findMany({
        select: { id: true, name: true, email: true },
      });

      if (response.length < 1) {
        const message: string = "No user for now";
        return next(new ErrorHandler(message, 404));
      }

      return res.status(200).json({
        success: true,
        message: response,
      });
    }
  ),
};

export default controller;