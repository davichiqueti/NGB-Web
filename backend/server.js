import express, { urlencoded } from "express";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
import connectMongoDB from "./database/connectMongoDB.js";
import cookieParser from "cookie-parser";


// Loading environment variables from .env file
dotenv.config();
// Creating Application
const app = express();
// Adding middlewares
app.use(express.json()); // Handles API requests with JSON body
app.use(express.urlencoded({ extended: true })); //Allows parsing request data from URL encoding
app.use(cookieParser());
// Setting routes
app.use("/api/auth", authRoutes);
// Exposing APP
app.listen(8000, () => {
        console.log("Server running on port 8000");
        connectMongoDB();
    }
)