import mongoose from "mongoose";
import express from "express";

import { appRouter } from "./src/routers/appRouter.js";


const app = express();
const PORT = 3000;
const DB_URL = `mongodb+srv://user:user@cluster0.lyxacrd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

app.use(express.json());
app.use("/",appRouter)

async function startApp() {
  try {
    app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`));
    await mongoose.connect(DB_URL);
  } catch (e) {
    console.log(e);
  }
}
startApp();

