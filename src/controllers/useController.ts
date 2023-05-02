import { User } from "../entities/user";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

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

  const userExists = await User.findOne({ login: login });

  if (userExists)
    return res.status(422).json({ message: "User already exists!" });

  // Create password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // Create user
  const user = new User({
    login,
    name,
    password: passwordHash,
  });

  try {
    await user.save();
    res.status(201).json({ message: "User created with success!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something was wrong, try again!" });
  }
};
