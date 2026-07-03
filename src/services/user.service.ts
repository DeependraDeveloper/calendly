// Service for user-related business logic

import { CreateUserDto } from "../dtos/user.dto.js";
import {
 findAll,
 findByEmail,
 findOne,
 insert,
 update,
 remove
} from "../repositories/user.repository.js";
import {  conflict, notFound } from "../utilities/api-error.js";

export const findAllUsers = async () => {
  const data = await findAll();
  return data;
};

export const findUserById = async (id: number) => {
  const data = await findOne(id);
  if (!data) throw notFound("User not found");
  return data;
};

export const addUser = async (userData: CreateUserDto) => {
  const existingUser = await findByEmail(userData.email);
  if (existingUser) throw conflict("User with this email already exists");
  const data = await insert(userData);
  return data;
};

export const modifyUser = async (
  id: number,
  userData: CreateUserDto,
) => {
  const data = await update(id, userData);
  return data;
};

export const removeUser = async (id: number) => {
  const data = await remove(id);
  return data;
};
