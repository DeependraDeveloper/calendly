// Service for user-related business logic

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

export const addUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
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
