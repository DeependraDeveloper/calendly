// Repository for user-related database operations
import { prisma } from "../config/db.js";

export const users = async () => {
  let data = await prisma.user.findMany();
  return data;
};

export const user = async (id: number) => {
  let data = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return data;
};
