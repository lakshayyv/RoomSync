import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "./CatchAsyncError";
import { fetchPayload } from "../utils/token";
import { ErrorHandler } from "../utils/errorHandler";
import { prisma } from "../config/db";

export const verifyAdmin = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.cookies.token;

    if (!token) {
      const message: string = "Admin not authorized";
      return next(new ErrorHandler(message, 401));
    }

    const tokenPayload = fetchPayload(token);

    if (!tokenPayload) {
      const message: string = "Admin not authorized";
      return next(new ErrorHandler(message, 401));
    }

    const response = await prisma.admin.findUnique({
      where: { id: tokenPayload.id },
    });

    if (!response) {
      const message: string = "Admin not authorized";
      return next(new ErrorHandler(message, 401));
    }

    req.admin = response;
    next();
  }
);
