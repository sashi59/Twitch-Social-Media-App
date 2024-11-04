import express from "express";
import { prtectedRoute } from "../middleware/protectUser.js";
import { followUnfollowUser, getSuggestedUser, getUserProfile, updateUserProfile } from "../controller/user.controller.js";
const router = express.Router();

router.get("/profile/:username",prtectedRoute, getUserProfile);
router.get("/suggested", prtectedRoute,getSuggestedUser);
router.post("/follow/:id",prtectedRoute, followUnfollowUser);
router.post("/update", prtectedRoute,updateUserProfile);


export default router;