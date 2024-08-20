import { Request, Response, NextFunction } from "express";

export const checkAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.admin || req.user) {
    next();
  } else {
    res.status(403).json({ success: false, message: "Access denied" });
  }
};
