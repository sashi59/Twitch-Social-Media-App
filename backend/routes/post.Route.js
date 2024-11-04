import express from "express";
import { commentOnPosts, createPost, deletePost, getAllPosts, getFollowingPosts, getLikedPosts, getUserPosts, likeUnlikePost } from "../controller/post.controller.js";
import { prtectedRoute } from "../middleware/protectUser.js";

const router = express.Router();

router.get("/all",prtectedRoute, getAllPosts);
router.get("/following",prtectedRoute,  getFollowingPosts);
router.get("/user/:username",prtectedRoute,  getUserPosts);
router.post("/create",prtectedRoute,  createPost);
router.delete("/:id",prtectedRoute,  deletePost);

router.post("/like/:id", prtectedRoute, likeUnlikePost);
router.get("/like/:id", prtectedRoute, getLikedPosts);
router.post("/comment/:id", prtectedRoute, commentOnPosts);

export default router;