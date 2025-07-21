import { Router } from "express";
import { request } from "../conrollers/PostController.js";
import { postCreatValidation } from "../validations/post.js";
import checkAuth from "../utils/checkAuth.js";
import hendelValidationErrors from "../utils/hendelValidationErrors.js";

const { createPost, getAll, getOne, deleteOne, update } = request;

export const postRouter = Router();
postRouter.post(
  "/",
  checkAuth,
  postCreatValidation,
  hendelValidationErrors,
  createPost
);
postRouter.get("/", getAll);
postRouter.get("/:id", getOne);
postRouter.delete("/:id", checkAuth, deleteOne);
postRouter.patch(
  "/:id",
  checkAuth,
  postCreatValidation,
  hendelValidationErrors,
  update
);
