import { body } from "express-validator";

export const userValidation = [
  body("email", "this is not email").isEmail(),
  body("password", "password min 6").isLength({ min: 6 }),
];
