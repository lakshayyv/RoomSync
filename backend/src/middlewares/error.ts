import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/errorHandler";

export const ErrorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.message = error.message || "Something went wrong";
  error.statusCode = error.statusCode || 500;

  if (error.code === "P2002") {
    const message: string = "User already exist";
    error = new ErrorHandler(message, 400);
  }

  if(error.code === "P2025") {
    const message: string = "User doesn't exist";
    error = new ErrorHandler(message, 400);
  }

  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
