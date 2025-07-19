import { body } from "express-validator";

export const postCreatValidation = [
  body("title", "Enter title (min 3 letters)").isLength({ min: 3 }).isString(),
  body("content", "Enter content (min 10 letters)")
    .isLength({ min: 10 })
    .isString(),
  body("tags", "Enter array of tags").optional().isArray(),
];
