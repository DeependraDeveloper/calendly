// Service for user-related business logic

import { users } from "../repositories/user.repository.js";

export const findAllUsers = async () => {
  // Here you can add any business logic before fetching users from the repository
  const data = await users();
  return data;
}