
import {signupUser, signinUser, logoutUser, getMe} from "../controller/auth.controller.js"
import express from "express";
import { prtectedRoute } from "../middleware/protectUser.js";
const router = express.Router();

router.get('/getMe', prtectedRoute,getMe)
router.post('/signup',  signupUser);
router.post('/signin',  signinUser);
router.post('/logout', logoutUser)


export default router;
