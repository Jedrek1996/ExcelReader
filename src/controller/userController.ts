import { Request, Response } from "express";
import { createJWT } from "../utils/jwtUtils";
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

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    const token = createJWT({ userId: user._id });
    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === "production",
    });

    return res
      .status(200)
      .json({ message: "User authenticated", token, username: user.username });
  } catch (error) {
    return res.status(500).json({ error: "Error authenticating user" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  return res.status(200).json({ message: "User logout!" });
};

export const getUser = async (req: Request, res: Response) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({
      message: "User information",
      user: user.username,
      userId: user._id,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


