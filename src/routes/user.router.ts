import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema, updateUserSchema } from "../dtos/user.dto.js";
import { userAuth } from "../middlewares/user-auth.js";

const userRouter: Router = Router();

userRouter.get("/all", getAllUsers);
userRouter.post("/", validate(createUserSchema), createUser);
userRouter.get("/", userAuth, getUserById);
userRouter.patch("/", userAuth, validate(updateUserSchema), updateUser);
userRouter.delete("/", userAuth, deleteUser);

export default userRouter;
