//Env file config ✨
import * as dotenv from "dotenv";
dotenv.config();

//Express ✨
import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes ✨
import excelRoute from "./routes/excelRoute";
app.use("/api", excelRoute);

// Serve static files from React build ✨
import path from "path";
app.use(express.static(path.join(__dirname, "../client/build")));

// Handle routes by sending to build index ✨
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

//CORS Policy ✨
import cors from "cors";
app.use(cors());

//Mongodb connection ✨
const port = process.env.PORT || 5100;
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
