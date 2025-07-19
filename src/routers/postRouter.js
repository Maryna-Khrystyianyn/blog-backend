import { Router } from "express";
import { request } from "../conrollers/PostController.js";
import { postCreatValidation } from "../validations/post.js";
import checkAuth from "../utils/checkAuth.js";

const { createPost, getAll, getOne, deleteOne, update } = request;

export const postRouter = Router();
postRouter.post("/", checkAuth, postCreatValidation, createPost);
postRouter.get("/", getAll);
postRouter.get("/:id", getOne);
postRouter.delete("/:id", checkAuth, deleteOne);
postRouter.patch("/:id", checkAuth, update);
