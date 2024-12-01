import express, { urlencoded } from "express";
import cors from 'cors';
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import notificationRoutes from "./routes/notifications.js";
import dotenv from "dotenv";
import connectMongoDB from "./database/connectMongoDB.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";


// Loading environment variables from .env file
dotenv.config();
// Creating Application
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',// allows front requests
    credentials: true,
  }));

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

// Adding middlewares
app.use(express.json()); // Handles API requests with JSON body
app.use(express.urlencoded({ extended: true })); //Allows parsing request data from URL encoding
app.use(cookieParser());
// Setting routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);
// Exposing APP
app.listen(8000, () => {
        console.log("Server running on port 8000");
        connectMongoDB();
    }
)
