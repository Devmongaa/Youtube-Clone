import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.router.js";




const app = express();


// middleware is a function that runs between the request and the response before reaching the route handler
app.use(express.json()); //json format data
app.use(cookieParser()); // helps in cookie parsing which means reading cookies from request
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
})); //helps in cross origin resource sharing
app.use(express.urlencoded({ extended: true })); //url encoded data
app.use(express.static("public")); // to serve static files



//routes
app.use("/api/v1/users", userRouter);


export default app;