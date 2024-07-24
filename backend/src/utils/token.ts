import jwt from "jsonwebtoken";
import { TokenPayload } from "./types/types";

export const fetchToken = (id: string, email: string): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("Missing environment variables");
  }

  const payload: object = { id: id, email: email };
  const token: string = jwt.sign(payload, secret);

  return token;
};

export const fetchPayload = (token: string): TokenPayload => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("Missing environment variables");
  }

  const payload: TokenPayload = jwt.verify(token, secret) as TokenPayload;

  return payload;
};
