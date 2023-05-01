import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const DB_URL = "mongodb://localhost:27017/authjwt";
async function main(): Promise<void> {
  await mongoose.connect(DB_URL);
  console.log("Database connect!");
}

main().catch((err) => console.log(err));
