import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import pinRouter from "./routes/pinRoute.js";
import commentRouter from "./routes/commentRoute.js";
import boardRouter from "./routes/boardRoute.js";
import connectDB from "./utils/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();
app.use(fileUpload());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);
app.use("/users", userRouter);
app.use("/pins", pinRouter);
app.use("/comments", commentRouter);
app.use("/boards", boardRouter);

app.listen(3000, () => {
  connectDB();
  console.log("Server is running");
});
