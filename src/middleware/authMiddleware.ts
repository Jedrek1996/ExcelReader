import { Request, Response } from "express";
import { verifyJWT } from "../utils/jwtUtils";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: Function
) => {
  const token = req.cookies?.csvReaderToken;
  console.log(token);

  if (!token) {
    return res.redirect("/signin");
  }

  try {
    verifyJWT(token);
    next();
  } catch (error) {
    return res.status(401).json({ error: "JWT Authentication Invalid" });
  }
};

