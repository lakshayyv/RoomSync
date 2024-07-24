import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../../middlewares/CatchAsyncError";
import { prisma } from "../../config/db";
import { ErrorHandler } from "../../utils/errorHandler";

const controller = {
  fetchRequest: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const response = await prisma.request.findMany({
        where: { status: "ONGOING" },
      });

      if (response.length < 1) {
        const message: string = "No request for now";
        return next(new ErrorHandler(message, 404));
      }
      return res.status(200).json({
        success: true,
        message: response,
      });
    }
  ),

  approve: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const requestId: string = req.query.id as string;

      const request = await prisma.request.findUnique({
        where: { id: requestId, status: "ONGOING" },
      });

      if (!request) {
        const message: string = "Request doesn't exist";
        return next(new ErrorHandler(message, 404));
      }

      const response = await prisma.request.update({
        where: { id: request.id },
        data: { status: "APPROVED" },
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
        message: "Request approved",
      });
    }
  ),

  reject: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const requestId: string = req.query.id as string;

      const request = await prisma.request.findUnique({
        where: { id: requestId, status: "PENDING" },
      });

      if (!request) {
        const message: string = "Request doesn't exist";
        return next(new ErrorHandler(message, 404));
      }

      await prisma.request.delete({ where: { id: request.id } });

      return res.status(200).json({
        success: true,
        message: "Request rejected",
      });
    }
  ),
};

export default controller;
