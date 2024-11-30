import express, { urlencoded } from "express";
import cors from 'cors';
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import notificationRoutes from "./routes/notifications.js";
import dotenv from "dotenv";
import connectMongoDB from "./database/connectMongoDB.js";
import cookieParser from "cookie-parser";


// Loading environment variables from .env file
dotenv.config();
// Creating Application
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',// allows front requests
    credentials: true,
  }));


// Adding middlewares
app.use(express.json()); // Handles API requests with JSON body
app.use(express.urlencoded({ extended: true })); //Allows parsing request data from URL encoding
app.use(cookieParser());
// Setting routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationsRoutes);
// Exposing APP
app.listen(8000, () => {
        console.log("Server running on port 8000");
        connectMongoDB();
    }
)
