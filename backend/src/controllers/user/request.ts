import { NextFunction, Request, Response } from "express";
import { prisma } from "../../config/db";
import { CatchAsyncError } from "../../middlewares/CatchAsyncError";
import { ErrorHandler } from "../../utils/errorHandler";
import {
  handleAuthorization,
  handleUserExistence,
  handleExistingRequest,
  handleSelfRequest,
  handleAdminRequest,
  handleUserRequest,
} from "../../utils/handler";
import { User } from "@prisma/client";

const controller = {
  request: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId: string = req.query.id as string;
      const payload: User = req.user as User;
      handleAuthorization(payload, next);

      if (handleSelfRequest(payload.id, userId, next)) return;
      if (await handleAdminRequest(payload, next)) return;
      if (await handleUserRequest(userId, next)) return;
      if (await handleExistingRequest(payload.id, userId, next)) return;

      const match = await prisma.request.findFirst({
        where: { senderId: userId, receiverId: payload.id },
      });

      if (match) {
        const response = await prisma.request.update({
          where: { id: match.id },
          data: { status: "ONGOING" },
        });

        await prisma.request.deleteMany({
          where: {
            AND: [
              {
                OR: [
                  { senderId: response.senderId },
                  { senderId: response.receiverId },
                ],
              },
              { status: "PENDING" },
            ],
          },
        });

        await prisma.request.deleteMany({
          where: {
            AND: [
              {
                OR: [
                  { receiverId: response.senderId },
                  { receiverId: response.receiverId },
                ],
              },
              { status: "PENDING" },
            ],
          },
        });

        return res.status(200).json({
          success: true,
          message: "Request sent to admin",
        });
      }

      const user = await handleUserExistence(userId, next);

      const response = await prisma.request.create({
        data: {
          sender: { connect: { id: payload.id } },
          receiver: { connect: { id: user.id } },
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

  fetchSent: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const payload: User = req.user as User;
      handleAuthorization(payload, next);

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

  fetchReceived: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const payload: User = req.user as User;
      handleAuthorization(payload, next);

      const response = await prisma.request.findMany({
        where: { receiverId: payload.id, status: "PENDING" },
      });

      if (response.length < 1) {
        const message: string = "No received request";
        return next(new ErrorHandler(message, 404));
      }

      return res.status(200).json({
        success: true,
        message: response,
      });
    }
  ),

  fetchOngoing: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const payload: User = req.user as User;
      handleAuthorization(payload, next);

      const response = await prisma.request.findMany({
        where: {
          AND: [
            { OR: [{ senderId: payload.id }, { receiverId: payload.id }] },
            { OR: [{ status: "ONGOING" }, { status: "APPROVED" }] },
          ],
        },
      });

      if (response.length < 1) {
        const message: string = "No ongoing request";
        return next(new ErrorHandler(message, 404));
      }

      return res.status(200).json({
        success: true,
        message: response,
      });
    }
  ),

  retract: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const requestId: string = req.query.id as string;
      const payload: User = req.user as User;
      handleAuthorization(payload, next);

      const response = await prisma.request.delete({
        where: { id: requestId, status: "PENDING" },
      });

      return res.status(200).json({
        success: true,
        message: "Request deleted successfully",
      });
    }
  ),

  accept: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const requestId: string = req.query.id as string;
      const payload: User = req.user as User;
      handleAuthorization(payload, next);

      const request = await prisma.request.findUnique({
        where: { id: requestId, receiverId: payload.id },
      });

      if (!request) {
        const message: string = "Cannot accept request";
        return next(new ErrorHandler(message, 400));
      }

      const response = await prisma.request.update({
        where: { id: request.id },
        data: { status: "ONGOING" },
      });

      await prisma.request.deleteMany({
        where: {
          AND: [
            {
              OR: [
                { senderId: response.senderId },
                { senderId: response.receiverId },
              ],
            },
            { status: "PENDING" },
          ],
        },
      });

      await prisma.request.deleteMany({
        where: {
          AND: [
            {
              OR: [
                { receiverId: response.senderId },
                { receiverId: response.receiverId },
              ],
            },
            { status: "PENDING" },
          ],
        },
      });

      return res.status(200).json({
        success: true,
        message: "Request sent to admin",
      });
    }
  ),

  reject: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const requestId: string = req.query.id as string;
      const payload: User = req.user as User;
      handleAuthorization(payload, next);

      const request = await prisma.request.findUnique({
        where: { id: requestId, receiverId: payload.id },
      });

      if (!request) {
        const message: string = "Cannot reject request";
        return next(new ErrorHandler(message, 400));
      }

      await prisma.request.delete({ where: { id: request.id } });

      return res.status(200).json({
        success: true,
        message: "Request deleted successfully",
      });
    }
  ),
};

export default controller;
