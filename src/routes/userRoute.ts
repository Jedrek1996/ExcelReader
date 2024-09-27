import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
} from "../controller/userController";

const router = express.Router();

//User Routes
router.post("/register-user", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/getUser/:username", getUser);

export default router;
