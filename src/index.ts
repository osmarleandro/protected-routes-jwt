import express from "express";
import cors from "cors";

import "./config/db.js";

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, (): void => {
  console.log(`Server is running on port ${port}`);
});
