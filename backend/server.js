import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import notificationRoutes from "./routes/notifications.js";
import connectMongoDB from "./database/connectMongoDB.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

// Criando aplicação
const app = express();

// Permitir requisições externas
app.use(cors({
    origin: process.env.FRONTEND_HOST,
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true
}));

// Configuração do Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Adicionando middlewares com limite de payload
const MAX_PAYLOAD_SIZE = '10mb'; // Define o tamanho máximo permitido

app.use(express.json({ limit: MAX_PAYLOAD_SIZE })); // Lida com corpo JSON
app.use(express.urlencoded({ limit: MAX_PAYLOAD_SIZE, extended: true })); // Lida com dados URL-encoded
app.use(cookieParser());

// Configuração de rotas
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

// Iniciando o servidor
app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000");
    connectMongoDB();
});
