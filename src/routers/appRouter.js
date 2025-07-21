import { postRouter } from "./postRouter.js";
import { userRouter } from "./userRouter.js";
import { imgRouter } from "./imgRouter.js";
import { Router } from "express";
import express from "express";

export const appRouter = Router();
appRouter.use("/post", postRouter);
appRouter.use("/auth", userRouter);
appRouter.use("/upload", imgRouter);
appRouter.use("/uploads", express.static("uploads"));
