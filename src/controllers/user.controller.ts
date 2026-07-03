// controllers for user-related HTTP requests
import { Request, Response } from "express";
import { findAllUsers } from "../services/user.service.js";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const data = await findAllUsers();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}