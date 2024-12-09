import dotenv from "dotenv";
dotenv.config();

import path from "path";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import notificationRoutes from "./routes/notifications.js";
import connectMongoDB from "./database/connectMongoDB.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import next from "next";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(`Running in ${process.env.NODE_ENV} mode`);
const dev = process.env.NODE_ENV !== "production"; // Verifica o ambiente
const nextApp = next({ dev, dir: path.join(__dirname, "../frontend") });
const handle = nextApp.getRequestHandler(); // Gerencia rotas padrão do Next.js

const app = express();

// Configuração de CORS
app.use(cors({
    origin: process.env.FRONTEND_HOST,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Cookie'],
    credentials: true
}));

// Configuração do Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Limite de tamanho do payload
const MAX_PAYLOAD_SIZE = '10mb';
app.use(express.json({ limit: MAX_PAYLOAD_SIZE }));
app.use(express.urlencoded({ limit: MAX_PAYLOAD_SIZE, extended: true }));
app.use(cookieParser());

// Rotas da API
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

// Inicializa o Next.js e configura o servidor
nextApp.prepare().then(() => {
    // Rotas personalizadas (se necessário)
    app.get("/custom-route", (req, res) => {
        return nextApp.render(req, res, "/custom-page", req.query); // Rota personalizada
    });

    // Rotas padrão gerenciadas pelo Next.js
    app.all("*", (req, res) => {
        return handle(req, res); // Next.js gerencia todas as outras rotas
    });

    // Inicia o servidor
    app.listen(8000, () => {
        console.log("Servidor rodando na porta 8000");
        connectMongoDB(); // Conecta ao MongoDB
    });
});
