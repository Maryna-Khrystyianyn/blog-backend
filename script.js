import mongoose from "mongoose";
import express from "express";
import { userValidation } from "./src/validations/auth.js";
import checkAuth from "./src/utils/checkAuth.js";
import * as UserController from "./src/conrollers/UserConroller.js";
import { postRouter } from "./src/routers/postRouter.js";

const app = express();
const PORT = 3000;
const DB_URL = `mongodb+srv://user:user@cluster0.lyxacrd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
app.use(express.json());

app.post("/auth/login", userValidation, UserController.login);
app.post("/auth/register", userValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.use("/post", postRouter);

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
