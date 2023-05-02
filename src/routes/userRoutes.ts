import { Router } from "express";
import { createUser, login } from "../controllers/useController";

export const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.status(200).json({ message: "User Route!" });
});

userRouter.post("/", createUser);

userRouter.post("/login", login);
