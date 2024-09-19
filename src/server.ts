//Env file config ✨
import * as dotenv from "dotenv";
dotenv.config();

//Express ✨
import express from "express";
const app = express();
const port = 3000;

//mongodb connection ✨
import mongoose from "mongoose";
try {
  mongoose.connect(process.env.MONGO_URL as string);
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
