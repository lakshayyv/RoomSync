/*
  Warnings:

  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "age" TEXT NOT NULL,
ADD COLUMN     "course" TEXT NOT NULL,
ADD COLUMN     "year" TEXT NOT NULL;
