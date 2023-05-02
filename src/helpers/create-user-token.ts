import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { readStringFromFile } from '../helpers/read-file';
import { IUser } from '../interfaces/IUser.js';

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

  res.json({ message: "User authenticated with success!", token: token });
};
