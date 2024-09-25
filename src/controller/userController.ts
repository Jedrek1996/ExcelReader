import { Request, Response } from "express";
import User from "../models/userModel";

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error registering user" });
  }
};

export const authenticateUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    const token = "generated-jwt-token";

    return res.status(200).json({ message: "User authenticated", token });
  } catch (error) {
    return res.status(500).json({ error: "Error authenticating user" });
  }
};
