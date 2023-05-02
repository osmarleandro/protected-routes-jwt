import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { readStringFromFile } from './read-file';

export function getToken(req: Request): string | undefined {
  const authHeader = req.headers["authorization"];

  const token = authHeader?.split(" ")[1];

  return token;
}

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const secret = await readStringFromFile("secret.file");

  if (!req.headers.authorization) {
    return res.status(401);
  }

  const token = getToken(req);

  if (!token) {
    return res.status(401);
  }

  try {
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next(verified);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid Token!" });
  }
}
