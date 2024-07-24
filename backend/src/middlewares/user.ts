import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "./CatchAsyncError";
import { fetchPayload } from "../utils/token";
import { ErrorHandler } from "../utils/errorHandler";
import { prisma } from "../config/db";

export const verifyUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.cookies.token;

    if (!token) {
      const message: string = "User not authorized";
      return next(new ErrorHandler(message, 401));
    }

    const tokenPayload = fetchPayload(token);

    if (!tokenPayload) {
      const message: string = "User not authorized";
      return next(new ErrorHandler(message, 401));
    }

    const response = await prisma.user.findUnique({
      where: { id: tokenPayload.id },
    });

    if (!response) {
      const message: string = "User not authorized";
      return next(new ErrorHandler(message, 401));
    }

    req.user = response;
    next();
  }
);
