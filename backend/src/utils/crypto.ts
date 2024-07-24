import crypto from "node:crypto";
import { ParseStatus } from "zod";

export const hashPassword = (password: string): string => {
  const algorithm = process.env.CRYPTO_ALGO;
  const secret = process.env.CRYPTO_SECRET;

  if (!algorithm || !secret) {
    throw new Error("Environment variables missing");
  }

  const hash: string = crypto
    .createHmac(algorithm, secret)
    .update(password)
    .digest("hex");

  return hash;
};

export const verifyHash = (hash: string, password: string): boolean => {
  const hashedPassword = hashPassword(password);

  return hash === hashedPassword;
};
