import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

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

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Youtube Clone Backend is running");
})

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
