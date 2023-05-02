import express from "express";
import cors from "cors";

import "./config/db.js";

import { userRouter } from "./routes/userRoutes.js";

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);

app.listen(port, (): void => {
  console.log(`Server is running on port ${port}`);
});
