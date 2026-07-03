// Service for user-related business logic

import { users , user} from "../repositories/user.repository.js";

export const findAllUsers = async () => {
  // Here you can add any business logic before fetching users from the repository
  const data = await users();
  return data;
}

export const findUserById = async (id: number) => {
    // Here you can add any business logic before fetching a user by ID from the repository
  const data = await user(id);

  if(!data) {
    throw new Error("User not found");
  }

  return data;
}