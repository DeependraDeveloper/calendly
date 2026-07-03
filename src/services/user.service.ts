// Service for user-related business logic

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../repositories/user.repository.js";

export const findAllUsers = async () => {
  // Here you can add any business logic before fetching users from the repository
  const data = await getUsers();
  return data;
};

export const findUserById = async (id: number) => {
  // Here you can add any business logic before fetching a user by ID from the repository
  const data = await getUser(id);

  if (!data) {
    throw new Error("User not found");
  }

  return data;
};

export const addUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  // Here you can add any business logic before creating a new user in the repository
  const data = await createUser(userData);
  return data;
};

export const modifyUser = async (
  id: number,
  userData: { name?: string; email?: string; password?: string },
) => {
  // Here you can add any business logic before updating a user in the repository
  const data = await updateUser(id, userData);
  return data;
};

export const removeUser = async (id: number) => {
  // Here you can add any business logic before deleting a user from the repository
  const data = await deleteUser(id);
  return data;
};
