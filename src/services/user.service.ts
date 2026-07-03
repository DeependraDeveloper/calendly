// Service for user-related business logic

import { CreateUserDto } from "../dtos/user.dto.js";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../repositories/user.repository.js";
import { notFound } from "../utilities/api-error.js";

export const findAllUsers = async () => {
  const data = await getUsers();
  return data;
};

export const findUserById = async (id: number) => {
    const data = await getUser(id);
    if (!data) throw notFound("User not found");
    return data;
};

export const addUser = async (userData: CreateUserDto) => {
    console.log("User data received in service:", userData); // Debugging log
  const data = await createUser(userData);
  return data;
};

export const modifyUser = async (
  id: number,
  userData: { name?: string; email?: string; password?: string },
) => {
  const data = await updateUser(id, userData);
  return data;
};

export const removeUser = async (id: number) => {
  const data = await deleteUser(id);
  return data;
};
