// controllers for user-related HTTP requests
import { Request, Response } from "express";
import {
  findAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUser,
} from "../services/user.service.js";
import { sendSuccess } from "../utilities/api-response.js";

export const getAllUsers = async (_req: Request, res: Response) => {
  const data = await findAllUsers();
  sendSuccess(res, data, 200, "Users fetched successfully");
};

export const getUserById = async (req: Request, res: Response) => {
  // Cast req.params.id explicitly to string to avoid TypeScript errors or else it could be undefined or any type. Then parse it to an integer.
  const { id } = req.params;

  const data = await findUserById(Number(id));

  sendSuccess(res, data, 200, "User found successfully");
};

export const createUser = async (req: Request, res: Response) => {
  const userData = req.body;

  console.log("User data received in controller:", userData); 

  const data = await addUser(userData);

  sendSuccess(res, data, 201, "User created successfully");
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userData = req.body;

  const data = await modifyUser(Number(id), userData);

  sendSuccess(res, data, 200, "User updated successfully");
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await removeUser(Number(id));

  sendSuccess(res, data, 200, "User deleted successfully");
};
