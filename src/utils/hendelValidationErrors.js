import { validationResult } from "express-validator";

export default (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("hier ist fehler in registration");
    return res.status(400).json(errors.array());
  }
  next();
};
