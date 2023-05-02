import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { IUser } from "../interfaces/IUser.js";
import { readStringFromFile } from "../helpers/read-file";

export const createUserToken = async (
  user: IUser,
  req: Request,
  res: Response
) => {
  const secret = await readStringFromFile("secret.file");

  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    secret
  );

  res
    .status(200)
    .json({ message: "User authenticated with success!", token: token });
};
