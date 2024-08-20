import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middlewares/CatchAsyncError";
import { prisma } from "../config/db";
import { checkUser, ineligibleUser } from "../utils/helper";
import { ErrorHandler } from "../utils/errorHandler";
import { User } from "@prisma/client";

const controller = {
  // --USER

  fetchUser: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const user: User = req.user as User;

      const isUserEligible = await checkUser(user.id);

      if (isUserEligible) {
        const message: string = "You have a ongoing request.";
        return next(new ErrorHandler(message, 404));
      }

      let invalidUser = await ineligibleUser(user.id);
      invalidUser = [...invalidUser, user?.id];

      const response = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          age: true,
          year: true,
          course: true,
        },
        where: { id: { notIn: invalidUser }, year: user.year },
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
        select: {
          id: true,
          name: true,
          email: true,
          age: true,
          year: true,
          course: true,
        },
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
