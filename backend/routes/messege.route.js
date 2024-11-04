import express from 'express';
import {prtectedRoute} from "../middleware/protectUser.js"
import { getMesseges, sendMesseges } from '../controller/messege.controller.js';

const router = express.Router()

router.get("/:id",prtectedRoute, getMesseges);
router.post("/send/:id", prtectedRoute, sendMesseges);

export default router;