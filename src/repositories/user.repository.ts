// Repository for user-related database operations
import { prisma } from "../config/db.js";
import { CreateUserDto } from "../dtos/user.dto.js";

export const getUsers = async () => {
  let data = await prisma.user.findMany();
  return data;
};

export const getUser = async (id: number) => {
  let data = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return data;
};

export const createUser = async (userData:CreateUserDto) => {
  console.log("User data received in repository:", userData); 


  // const isEmailTaken = await prisma.user.findUnique({
  //   where: {
  //     email: userData.email,
  //   },
  // });

  // if (isEmailTaken) throw new Error("Email is already taken");

  const data = await prisma.user.create({
    data: userData,
  });
  return data;
};

export const updateUser = async (
  id: number,
  userData: { name?: string; email?: string; password?: string },
) => {
  const data = await prisma.user.update({
    where: {
      id,
    },
    data: userData,
  });
  return data;
};

export const deleteUser = async (id: number) => {
  const data = await prisma.user.delete({
    where: {
      id,
    },
  });
  return data;
};
