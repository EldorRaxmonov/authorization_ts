import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
import userRouter from "./user/user.router";
configDotenv();

const konsta = process.env.PORT;
const app = express();
app.use(express.json());

app.use("/auth", userRouter);
app.listen(konsta, () => {
  console.log(
    `Wassup world. Ur server is running on http://localhost:${konsta}`
  );
});
