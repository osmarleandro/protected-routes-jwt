import { User } from "../entities/user";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createUserToken } from "../helpers/create-user-token";

export const createUser = async (req: Request, res: Response) => {
  const { name, login, password, confirmPass } = req.body;

  // Validations
  if (!name || !login || !password || !confirmPass) {
    return res
      .status(422)
      .json({ message: "Please, fill all required fields!" });
  }
  if (password !== confirmPass)
    return res.status(422).json({ message: "The passwords are not equals!" });

  const userExists = await User.findOne({ login: login }).exec();

  if (userExists)
    return res.status(422).json({ message: "User already exists!" });

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    login,
    name,
    password: passwordHash,
  });

  try {
    const newUser = await user.save();
    await createUserToken(newUser, req, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something was wrong, try again!" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { login, password } = req.body;

  if (!login || !password) return res.status(422);

  const user = await User.findOne({ login: login }).exec();

  if (!user) return res.status(404);

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword)
    return res.status(422).json({ message: "The passwords do not match!" });

  await createUserToken(user, req, res);
};
