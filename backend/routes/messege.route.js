import express from 'express';
import {prtectedRoute} from "../middleware/protectUser.js"
import { getMesseges, sendMesseges } from '../controller/messege.controller.js';
import { getUserForChat } from '../controller/user.controller.js';

const router = express.Router()

router.get("/:id",prtectedRoute, getMesseges);
router.post("/send/:id", prtectedRoute, sendMesseges);
router.get("/", prtectedRoute,getUserForChat)

export default router;