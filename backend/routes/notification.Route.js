import express from "express";
import { prtectedRoute } from "../middleware/protectUser.js";
import { deleteAllNotification, getAllNotification } from "../controller/notification.controller.js";
const router = express.Router();


router.get("/", prtectedRoute, getAllNotification);
router.delete("/", prtectedRoute, deleteAllNotification);


export default router;