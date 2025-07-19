import mongoose from "mongoose";
import express from "express";
import User from "./src/models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { tegisterValidation } from "./src/validations/auth.js";
import { validationResult } from "express-validator";

const app = express();
const PORT = 3000;
const DB_URL = `mongodb+srv://user:user@cluster0.lyxacrd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
app.use(express.json());

app.post("/auth/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.password
    );
    if (!isValidPass) {
      res.status(404).json({ message: "Incorect email or password" });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      { expiresIn: "30d" }
    );

    const { password, ...userData } = user._doc;
    res.json({ ...userData, token });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.post("/auth/register", tegisterValidation, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const pass = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(pass, salt);

    const doc = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: passwordHash,
      avatar: req.body.avatar,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      { expiresIn: "30d" }
    );

    const { password, ...userData } = user._doc;
    res.json({ ...userData, token });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

async function startApp() {
  try {
    app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`));
    await mongoose.connect(DB_URL);
  } catch (e) {
    console.log(e);
  }
}
startApp();

// run();
// async function run() {
//   const user = new User({
//     firstName: "Max",
//     lastName: "Toll",
//     email: "max97@gmail.com",
//     password: "1111",
//   });
//   await user.save();
//   try {
//     const user = await User.create({
//       firstName: "Denis",
//       lastName: "Lavinom",
//       email: "danlav@gmail.com",
//       password: "3333",
//     });
//     console.log(user);
//   } catch (error) {
//     console.error(error);
//   }
// }

// findByFirstName("Max");
// async function findByFirstName(name) {
//   try {
//     const user = await User.findOne({
//       //   firstName: { $regex: name, $options: "i" },
//       firstName: name,
//     });
//     console.log(user);
//   } catch (error) {
//     console.error(error);
//   }
// }
