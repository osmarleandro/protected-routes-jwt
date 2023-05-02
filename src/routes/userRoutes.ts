import { Router } from "express";

export const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.status(200).json({ message: "User Route!" });
});
