// controllers for user-related HTTP requests
import { Request, Response } from "express";
import { findAllUsers, findUserById } from "../services/user.service.js";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const data = await findAllUsers();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  // Cast req.params.id explicitly to string to avoid TypeScript errors or else it could be undefined or any type. Then parse it to an integer.
  const {id} = req.params;

  try {
    // Just in case parsing fails and results in NaN
    if (isNaN(Number(id))) {
      res.status(400).json({ error: "Invalid user ID format" });
      return;
    }

    const data = await findUserById(Number(id));

    res.status(200).json(data);
  } catch (error : any) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
