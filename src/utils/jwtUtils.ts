import jwt, { JwtPayload } from "jsonwebtoken";

interface Payload {
  userId: any;
}

export const createJWT = (payload: Payload): string => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  if (!secret) throw new Error("JWT_SECRET is not defined");
  if (!expiresIn) throw new Error("JWT_EXPIRES_IN is not defined");

  const token = jwt.sign(payload, secret, {
    expiresIn,
  });

  return token;
};

export const verifyJWT = (token: string): JwtPayload | string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) throw new Error("JWT_SECRET is not defined");

  const decoded = jwt.verify(token, secret);
  console.log(decoded)
  return decoded;
};
