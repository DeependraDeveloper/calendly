// controllers for user-related HTTP requests
import { Request, Response } from "express";
import {
  findAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUser,
} from "../services/user.service.js";

export const getAllUsers = async (_req: Request, res: Response) => {
  const data = await findAllUsers();
  res.status(200).json(data);
};

export const getUserById = async (req: Request, res: Response) => {
  // Cast req.params.id explicitly to string to avoid TypeScript errors or else it could be undefined or any type. Then parse it to an integer.
  const { id } = req.params;

  const data = await findUserById(Number(id));

  res.status(200).json(data);
};

export const createUser = async (req: Request, res: Response) => {
  const userData = req.body;

  const data = await addUser(userData);

  res.status(201).json(data);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userData = req.body;

  const data = await modifyUser(Number(id), userData);

  res.status(200).json(data);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await removeUser(Number(id));

  res.status(200).json(data);
};
