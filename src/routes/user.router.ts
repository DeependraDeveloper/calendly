import {Router } from "express";
import { getAllUsers ,getUserById } from "../controllers/user.controller.js";

const userRouter: Router = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
export default userRouter;