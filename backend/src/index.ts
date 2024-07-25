import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors"

import userRouter from "./routes/user";
import requestRouter from "./routes/request";
import adminRouter from "./routes/admin";
import dashboardRouter from "./routes/dashboard";
import { ErrorMiddleware } from "./middlewares/error";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/request", requestRouter);
app.use("/api/v1/dashboard", dashboardRouter);

app.use(ErrorMiddleware);

app.listen(port, () => {
  console.log(`Server started at port [${port}]`);
});
