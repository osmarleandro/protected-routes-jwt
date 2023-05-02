import { Request, Response, Router } from 'express';

import { createUser, login } from '../controllers/useController';
import { verifyToken } from '../helpers/auth';

export const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.json({ message: "User Route!" });
});

userRouter.post("/", createUser);

userRouter.post("/login", login);

userRouter.get("/protected", verifyToken, (req: Request, res: Response) => {
  res.json({ message: `Protected Route! Welcome, ${req.user?.email}!` });
});
