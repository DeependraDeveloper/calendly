// Service for user-related business logic

import slug from "slug";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto.js";
import {
  findAll,
  findByEmail,
  findOne,
  insert,
  update,
  remove,
  findBySlug
} from "../repositories/user.repository.js";
import { conflict, notFound } from "../utilities/api-error.js";

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

  //# TODO MAKE SLUG UNQUIE 
  const slugInput = userData.slug ?? slug(userData.name, { lower: true });

  return insert({ ...userData, slug: slugInput });
};

export const modifyUser = async (id: number, userData: UpdateUserDto) => {
  const isUserExist = await findOne(id);
  if (!isUserExist) throw notFound("User not found");

  if (userData.email && userData.email !== isUserExist.email) {
    const existingUser = await findByEmail(userData.email);
    if (existingUser) throw conflict("User with this email already exists");
  }

  if (userData.slug && userData.slug !== isUserExist.slug) {
    const existingSlug = await findBySlug(userData.slug); 
    if (existingSlug) throw conflict("User with this slug already exists");
  }

  return update(id, userData);
};

export const removeUser = async (id: number) => {
  const isUserExist = await findOne(id);
  if (!isUserExist) throw notFound("User not found");

  return remove(id);
};
