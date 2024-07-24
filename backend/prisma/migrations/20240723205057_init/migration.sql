/*
  Warnings:

  - Added the required column `receiverName` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderName` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "receiverName" TEXT NOT NULL,
ADD COLUMN     "senderName" TEXT NOT NULL;
