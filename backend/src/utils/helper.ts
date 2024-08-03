import { prisma } from "../config/db";

export const ineligibleUser = async (userId: string): Promise<string[]> => {
  const response = await prisma.request.findMany({
    where: {
      OR: [{ status: { in: ["ONGOING", "APPROVED"] } }, { senderId: userId }],
    },
  });

  if (response.length < 1) {
    return [];
  }

  let result = response.map((request) => request.senderId);
  result = [...result, ...response.map((request) => request.receiverId)];
  return result;
};

export const checkUser = async (userId: string): Promise<Boolean> => {
  const response = await prisma.request.findFirst({
    where: { OR: [{senderId: userId}, {receiverId: userId}], status: { in: ["ONGOING", "APPROVED"] } },
  });

  if(response) {
    return true;
  }
  return false;
};
