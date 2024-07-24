import { prisma } from "../config/db";

export const ineligibleUser = async (): Promise<string[]> => {
  const response = await prisma.request.findMany({
    where: { status: { in: ["ONGOING", "APPROVED"] } },
  });

  if (response.length < 1) {
    return [];
  }

  let result = response.map((request) => request.senderId);
  result = [...result, ...response.map((request) => request.receiverId)];
  return result;
};
