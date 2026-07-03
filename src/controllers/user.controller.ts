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
  try {
    const data = await findAllUsers();
    res.status(200).json(data);
  } catch (error: any) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  // Cast req.params.id explicitly to string to avoid TypeScript errors or else it could be undefined or any type. Then parse it to an integer.
  const { id } = req.params;

  try {
    // Just in case parsing fails and results in NaN
    if (isNaN(Number(id))) {
      res.status(400).json({ error: "Invalid user ID format" });
      return;
    }

    const data = await findUserById(Number(id));

    res.status(200).json(data);
  } catch (error: any) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const userData = req.body;

  try {
    const data = await addUser(userData);

    res.status(201).json(data);
  } catch (error: any) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userData = req.body;

  try {
    if (isNaN(Number(id))) {
      res.status(400).json({ error: "Invalid user ID format" });
      return;
    }

    const data = await modifyUser(Number(id), userData);

    res.status(200).json(data);
  } catch (error: any) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (isNaN(Number(id))) {
      res.status(400).json({ error: "Invalid user ID format" });
      return;
    }

    const data = await removeUser(Number(id));

    res.status(200).json(data);
  } catch (error: any) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
