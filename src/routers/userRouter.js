import { Router } from "express";
import { userValidation } from "../validations/auth.js";
import checkAuth from "../utils/checkAuth.js";
import * as UserController from "../conrollers/UserConroller.js";
import hendelValidationErrors from "../utils/hendelValidationErrors.js";

export const userRouter = Router();

userRouter.post(
  "/login",
  userValidation,
  hendelValidationErrors,
  UserController.login
);
userRouter.post(
  "/register",
  userValidation,
  hendelValidationErrors,
  UserController.register
);
userRouter.get("/me", checkAuth, UserController.getMe);
