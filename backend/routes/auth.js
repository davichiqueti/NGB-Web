import express from "express";
import { signup, login, logout, authCheck } from "../controllers/auth.js";
import protectRoute from "../middleware/protectRoute.js"


const router = express.Router();
router.get("/authcheck", protectRoute, authCheck);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
