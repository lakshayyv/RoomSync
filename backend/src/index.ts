import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

import userRouter from "./routes/user";
import requestRouter from "./routes/request";
import adminRouter from "./routes/admin";
import dashboardRouter from "./routes/dashboard";
import { ErrorMiddleware } from "./middlewares/error";
import authRouter from "./routes/auth";

dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/request", requestRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/auth", authRouter);

app.use(ErrorMiddleware);

export default app;
