import express from "express";
import protectRoute from "../middleware/protectRoute";
import { deleteNotification, deleteNotifications, getNotifications } from "../controllers/notifications";
 
const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotifications);
router.delete("/:id", protectRoute, deleteNotification);
 
export default router;

