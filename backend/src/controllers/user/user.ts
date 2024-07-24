import { NextFunction, Request, Response } from "express";
import { prisma } from "../../config/db";
import { validator, Validator } from "../../utils/types/types";
import { CatchAsyncError } from "../../middlewares/CatchAsyncError";
import { hashPassword, verifyHash } from "../../utils/crypto";
import { ErrorHandler } from "../../utils/errorHandler";
import { handleAuthorization, handleTokenAndCookie } from "../../utils/handler";
import { User } from "@prisma/client";

const controller = {
  signup: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const body: Validator = req.body;

      const parserPayload = validator.safeParse(body);
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

      const token = handleTokenAndCookie(response.id, response.email, res);

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
        return next(new ErrorHandler("User doesn't exist", 400));
      }

      const isMatch: boolean = verifyHash(response.password, body.password);

      if (!isMatch) {
        return next(new ErrorHandler("Invalid password", 400));
      }

      const token = handleTokenAndCookie(response.id, response.email, res);

      return res.status(200).json({
        success: true,
        message: token,
      });
    }
  ),

  logout: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const payload = req.user;

      handleAuthorization(payload, next);

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

      handleAuthorization(payload, next);

      return res.status(200).json({
        success: true,
        message: payload,
      });
    }
  ),

  updateProfile: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const updatePayload = req.body;
      const payload: User = req.user as User;

      handleAuthorization(payload, next);

      if (updatePayload.name && payload.name !== updatePayload.name) {
        await prisma.request.updateMany({
          where: { senderId: payload.id },
          data: { senderName: updatePayload.name },
        });
        await prisma.request.updateMany({
          where: { receiverId: payload.id },
          data: { receiverName: updatePayload.name },
        });
      }

      const response = await prisma.user.update({
        where: { id: payload.id },
        data: updatePayload,
      });

      const token = handleTokenAndCookie(response.id, response.email, res);

      res.status(200).json({
        success: true,
        message: token,
      });
    }
  ),

  deleteProfile: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const payload: User = req.user as User;

      handleAuthorization(payload, next);

      await prisma.request.deleteMany({
        where: { OR: [{ senderId: payload.id }, { receiverId: payload.id }] },
      });

      await prisma.user.delete({ where: { id: payload.id } });

      return res.status(200).json({
        success: true,
        message: "Deleted successfully",
      });
    }
  ),
};

export default controller;
