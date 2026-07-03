// Repository for user-related database operations
import { prisma } from "../config/db.js";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto.js";

export const findAll = async () => {
  let data = await prisma.user.findMany();
  return data;
};

export const findOne = async (id: number) => {
  let data = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return data;
};

export const findByEmail = async (email: string) => {
  let data = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return data;
};

export const insert = async (userData: CreateUserDto) => {
  const data = await prisma.user.create({
    data: userData,
  });
  return data;
};

export const update = async (id: number, userData: UpdateUserDto) => {
  const data = await prisma.user.update({
    where: {
      id,
    },
    data: userData,
  });
  return data;
};

export const remove = async (id: number) => {
  const data = await prisma.user.delete({
    where: {
      id,
    },
  });
  return data;
};
