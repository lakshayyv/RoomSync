import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/db";
import { userParser, UserParser } from "../utils/types/types";
import { CatchAsyncError } from "../middlewares/CatchAsyncError";
import { hashPassword, verifyHash } from "../utils/crypto";
import { ErrorHandler } from "../utils/errorHandler";
import { fetchToken } from "../utils/token";

const controller = {
  signup: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const body: UserParser = req.body;

      const parserPayload = userParser.safeParse(body);
      if (!parserPayload.success) {
        const message: string = parserPayload.error.errors[0].message;
        return next(new ErrorHandler(message, 400));
      }

      body.password = hashPassword(body.password);

      const response = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: body.password,
        },
      });

      const token: string = fetchToken(response.id, response.email);
      res.cookie("token", token);

      return res.status(200).json({
        success: true,
        data: token,
      });
    }
  ),

  signin: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const body = req.body;

      const response = await prisma.user.findUnique({
        where: { email: body.email },
      });

      if (!response) {
        const message: string = "User doesn't exist";
        return next(new ErrorHandler(message, 400));
      }

      const isMatch: boolean = verifyHash(response.password, body.password);

      if (!isMatch) {
        const message: string = "Invalid password";
        return next(new ErrorHandler(message, 400));
      }

      const token: string = fetchToken(response.id, response.email);
      res.cookie("token", token);

      return res.status(200).json({
        success: true,
        message: token,
      });
    }
  ),

  logout: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const payload = req.user;

      if (!payload) {
        const message: string = "User not authorized";
        return next(new ErrorHandler(message, 401));
      }

      res.clearCookie("token");

      return res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    }
  ),

  fetchProfile: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const payload = req.user;

      if (!payload) {
        const message: string = "User not authorized";
        return next(new ErrorHandler(message, 401));
      }

      return res.status(200).json({
        success: true,
        message: payload,
      });
    }
  ),

  updateProfile: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const updatePayload = req.body;
      const payload = req.user;

      if (!payload) {
        const message: string = "User not authorized";
        return next(new ErrorHandler(message, 401));
      }

      const response = await prisma.user.update({
        where: { id: payload.id },
        data: updatePayload,
      });

      const token = fetchToken(response.id, response.email);
      res.cookie("token", token);

      res.status(200).json({
        success: true,
        message: token,
      });
    }
  ),

  deleteProfile: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const payload = req.user;

      if (!payload) {
        const message: string = "User not authorized";
        return next(new ErrorHandler(message, 401));
      }

      const response = await prisma.user.delete({ where: { id: payload.id } });

      return res.status(200).json({
        success: true,
        message: "Deleted successfully",
      });
    }
  ),

  request: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId: string = req.query.id as string;
      const payload = req.user;

      if (!payload) {
        const message: string = "User not authorized";
        return next(new ErrorHandler(message, 401));
      }

      if (payload.id === userId) {
        const message: string = "Don't set request to yourself";
        return next(new ErrorHandler(message, 400));
      }

      const adminRequest = await prisma.request.findFirst({
        where: { OR: [{ status: "ONGOING" }, { status: "APPROVED" }] },
      });

      if (adminRequest) {
        const message: string = "Can't sent request anymore";
        return next(new ErrorHandler(message, 400));
      }

      const request = await prisma.request.findFirst({
        where: { senderId: payload.id, receiverId: userId },
      });

      if (request) {
        const message: string = "Request already sent";
        return next(new ErrorHandler(message, 400));
      }

      const match = await prisma.request.findFirst({
        where: { senderId: userId, receiverId: payload.id },
      });

      if (match) {
        const response = await prisma.request.update({
          where: { id: match.id },
          data: { status: "ONGOING" },
        });

        return res.status(200).json({
          success: true,
          message: "Request sent to admin",
        });
      }

      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user) {
        const message: string = "User doesn't exist";
        return next(new ErrorHandler(message, 400));
      }

      const response = await prisma.request.create({
        data: {
          sender: { connect: { id: payload.id } },
          receiver: { connect: { id: user?.id } },
          senderName: payload.name,
          receiverName: user.name,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Requested successfully",
      });
    }
  ),

  fetchSentRequest: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const payload = req.user;

      if (!payload) {
        const message: string = "User not authorized";
        return next(new ErrorHandler(message, 401));
      }

      const response = await prisma.request.findMany({
        where: { senderId: payload.id, status: "PENDING" },
      });

      if (response.length < 1) {
        const message: string = "No sent request";
        return next(new ErrorHandler(message, 404));
      }

      return res.status(200).json({
        success: true,
        message: response,
      });
    }
  ),

  fetchReceivedRequest: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const payload = req.user;

      if (!payload) {
        const message: string = "User not authorized";
        return next(new ErrorHandler(message, 401));
      }

      const response = await prisma.request.findMany({
        where: { receiverId: payload.id, status: "PENDING" },
      });

      if (response.length < 1) {
        const message: string = "No sent request";
        return next(new ErrorHandler(message, 404));
      }

      return res.status(200).json({
        success: true,
        message: response,
      });
    }
  ),

  fetchRequest: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const payload = req.user;

      if (!payload) {
        const message: string = "User not authorized";
        return next(new ErrorHandler(message, 401));
      }

      const response = await prisma.request.findMany({
        where: {
          AND: [
            { OR: [{ senderId: payload.id }, { receiverId: payload.id }] },
            { OR: [{ status: "ONGOING" }, { status: "APPROVED" }] },
          ],
        },
      });

      if (response.length < 1) {
        const message: string = "No sent request";
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
