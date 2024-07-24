import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../../middlewares/CatchAsyncError";
import { ErrorHandler } from "../../utils/errorHandler";
import { hashPassword, verifyHash } from "../../utils/crypto";
import { handleAuthorization, handleTokenAndCookie } from "../../utils/handler";
import { prisma } from "../../config/db";
import { validator, Validator } from "../../utils/types/types";
import { Admin } from "@prisma/client";

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

      const response = await prisma.admin.create({
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

      const response = await prisma.admin.findUnique({
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
      const payload = req.admin;

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
      const payload = req.admin;

      handleAuthorization(payload, next);

      return res.status(200).json({
        success: true,
        message: payload,
      });
    }
  ),

  deleteProfile: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const payload: Admin = req.admin as Admin;

      handleAuthorization(payload, next);

      await prisma.admin.delete({ where: { id: payload.id } });

      return res.status(200).json({
        success: true,
        message: "Deleted successfully",
      });
    }
  ),

  deleteUser: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId: string = req.query.id as string;
      const payload: Admin = req.admin as Admin;

      handleAuthorization(payload, next);

      await prisma.request.deleteMany({
        where: { OR: [{ senderId: userId }, { receiverId: userId }] },
      });

      await prisma.user.delete({ where: { id: userId } });

      return res.status(200).json({
        success: true,
        message: "Deleted successfully",
      });
    }
  ),
};

export default controller;
