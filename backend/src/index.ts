import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user";
import dotenv from "dotenv";
import { ErrorMiddleware } from "./middlewares/error";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);

app.use(ErrorMiddleware);

app.listen(port, () => {
  console.log(`Server started at port [${port}]`);
});
