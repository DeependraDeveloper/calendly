import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema ,updateUserSchema} from "../dtos/user.dto.js";

const userRouter: Router = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", validate(createUserSchema), createUser);
userRouter.patch("/:id",validate(updateUserSchema), updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
