import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import pinRouter from "./routes/pinRoute.js";
import commentRouter from "./routes/commentRoute.js";
import boardRouter from "./routes/boardRoute.js";
import connectDB from "./utils/connectDB.js";

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/pins", pinRouter);
app.use("/comments", commentRouter);
app.use("/boards", boardRouter);

app.listen(3000, () => {
  connectDB();
  console.log("Server is running");
});
