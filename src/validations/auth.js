import { body } from "express-validator";
import jwt from "jsonwebtoken";
export const tegisterValidation = [
  body("email", "this is not email").isEmail(),
  body("password", "password min 6").isLength({ min: 6 }),
];
