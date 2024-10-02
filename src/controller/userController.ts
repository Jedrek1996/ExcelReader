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

    res.cookie("csvReaderToken", token, {
      // httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.cookie("csvReaderUser", username, {
      // httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ message: "User authenticated", token, username: user.username });
  } catch (error) {
    return res.status(500).json({ error: "Error authenticating user" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("csvReaderToken", {
    // httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  res.clearCookie("csvReaderUser", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return res.status(200).json({ message: "User logged out!" });
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

export const validateUser = async (req: Request, res: Response) => {
  const username = req.params.user;
  console.log("Validating user:", username);

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return false;
    }
    console.log("User found");
    return true;
  } catch (error) {
    console.error("Error fetching user:", error);
    return false;
  }
};
