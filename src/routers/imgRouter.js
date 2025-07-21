import { Router } from "express";
import { requestImg } from "../conrollers/imgController.js";
import checkAuth from "../utils/checkAuth.js";
import multer from "multer";

const { uploadImg } = requestImg;

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export const imgRouter = Router();
imgRouter.post("/", upload.single("image"), checkAuth, uploadImg);
