import { prisma } from "../config/db";
import { Response, NextFunction } from "express";
import { ErrorHandler } from "./errorHandler";
import { fetchToken } from "./token";

export const handleAuthorization = (payload: any, next: NextFunction) => {
  if (!payload) {
    return next(new ErrorHandler("User not authorized", 401));
  }
};

export const handleTokenAndCookie = (
  userId: string,
  email: string,
  res: Response
) => {
  const token: string = fetchToken(userId, email);
  res.cookie("token", token);
  return token;
};

export const handleUserExistence = async (
  userId: string,
  next: NextFunction
): Promise<any> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    const message: string = "User doesn't exist";
    return next(new ErrorHandler(message, 400));
  }
  return user;
};

export const handleExistingRequest = async (
  senderId: string,
  receiverId: string,
  next: NextFunction
): Promise<any> => {
  const request = await prisma.request.findFirst({
    where: { senderId: senderId, receiverId: receiverId },
  });
  if (request) {
    const message: string = "Request already sent";
    return next(new ErrorHandler(message, 400));
  }
  return request;
};
