import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoutes from "./routes/Users.js";
import VideoRoutes from "./routes/Videos.js";
import CommentRoutes from "./routes/Comment.js";
import AuthRoutes from "./routes/Auth.js";
import cookieParser from "cookie-parser";

const port = 8080;
const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => {
      console.log("Connected To DataBase...");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/videos", VideoRoutes);
app.use("/api/comments", CommentRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something Went Wrong!";

  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(port, () => {
  connect(), console.log(`Connected To Server ${port} `);
});
