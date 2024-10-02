//Env file config ✨
import * as dotenv from "dotenv";
dotenv.config();

//Express ✨
import express from "express";

import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes ✨
import excelRoute from "./routes/excelRoute";
import userRoute from "./routes/userRoute";
import { authenticateUser } from "./middleware/authMiddleware";

app.get("/", authenticateUser);
app.use("/api/excel", authenticateUser, excelRoute);
app.use("/api/users", userRoute);

// Serve static files from React build ✨
import path from "path";
app.use(express.static(path.join(__dirname, "../client/build")));

// Handle routes by sending to build index ✨
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

//CORS Policy ✨
import cors from "cors";
app.use(cors());

//Mongodb connection ✨
const port = process.env.PORT || 5100;
import mongoose from "mongoose";
import { Request } from "express";
import { Response } from "express";
try {
  mongoose.connect(process.env.MONGO_URL as string);
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
