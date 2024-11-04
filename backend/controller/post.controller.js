import Post from "../model/post.model.js";
import User from "../model/user.model.js";
import Notification from "../model/notification.model.js";
import { v2 as cloudinary } from "cloudinary";


export const getAllPosts = async (req, res) => {

    try {
        const allPosts = await Post.find({}).sort({ createdAt: -1 }).populate({
            path: "user",
            select: "-password"
        }).populate({
            path: "comments.user",
            select: "-password"

        })
        return res.status(200).json(allPosts);
    } catch (error) {
        console.log("Error in getAllPost", error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

export const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        let { img } = req.body;

        const userId = req.user._id;

        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(400).json({ error: "User Not Found" })
        }
        if (!text) {
            return res.status(400).json({ error: "Text is Required" })
        }

        if (img) {
            try {
                const responseUpload = await cloudinary.uploader.upload(img);
                img = responseUpload.secure_url;
            } catch (error) {
                console.error("Error uploading to Cloudinary:", error);
                return res.status(500).json({ error: "Image upload failed" });
            }
        }

        const newPost = await Post.create({
            text,
            img,
            user: userId,
        })

        await newPost.save();

        return res.status(201).json(newPost);
    } catch (error) {
        console.log("Error in createPost", error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post Not Found" })
        }
        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "Unauthorized! Yo can't delete this post" })
        }
        if (post.img) {
            await cloudinary.uploader.destroy(post.img.split("/").pop().split(".")[0]);
            post.img = "";
        }

        await Post.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.log("Error in deletePost", error.messege)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const username = req.params.username;

        const user = await User.findOne({ username }).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User Not Found" })
        }
        const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 })
            .populate({
                path: "user",
                select: "-password"
            })
            .populate({
                path: "comments.user",
                select: "-password"
            });

        return res.status(200).json(posts);
    } catch (error) {
        console.log("Error in getUserPosts", error.messege)
        return res.status(500).json({ error: "Internal Server Error" })
    }


}

export const getFollowingPosts = async (req, res) => {

    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User Not Found" })
        }

        const followingUser = user.following;
        if (!followingUser) {
            return res.status(404).json({ error: "User Not Following Anyone" })
        }
        const feedPosts = await Post.find({ user: { $in: followingUser } })

            .sort({ createdAt: -1 })
            .populate({
                path: "user",
                select: "-password"
            })
            .populate({
                path: "comments.user",
                select: "-password"
            });

        return res.status(200).json(feedPosts);


    } catch (error) {
        console.log("Error in getFollowingPost", error)
        return res.status(500).json({ error: "Internal Server Error" })
    }

}

export const likeUnlikePost = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id: postId } = req.params;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        // const userLikedPost = post.likes.includes(userId);
        const user = await User.findById(userId);
        const userLikedPost = user.likedPosts.includes(postId);
        if (userLikedPost) {
            // Unlike post
            console.log("Unlike ", userLikedPost);
            post.likes.pull(userId);

            await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });
            await post.save();
            // res.status(200).json({ message: "Post unliked successfully" });
            const updatedLikes = post.likes.filter((id) => id.toString() !== userId.toString());
            res.status(200).json(updatedLikes);
        } else {
            // Like post
            console.log("like ", userLikedPost);

            post.likes.push(userId);
            await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
            await post.save();
            const notification = new Notification({
                from: userId,
                to: post.user,
                type: "like",
            });
            await notification.save();

            const updatedLikes = post.likes;
            res.status(200).json(updatedLikes);
        }
    } catch (error) {
        console.log("Error in likeUnlikePost controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getLikedPosts = async (req, res) => {

    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User Not Found" })
        }


        const likedPosts = await Post.find({ _id: { $in: user.likedPosts } });
        if (!likedPosts) {
            return res.status(404).json({ error: "User Not Liked Any Post" })
        }

        return res.status(200).json(likedPosts);
    } catch (error) {

        console.log("Error in getLikedPosts", error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

export const commentOnPosts = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: "Comment text is required" });
        }
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const comment = { user: userId, text };

        post.comments.push(comment);
        await post.save();
        return res.status(200).json(comment);
    } catch (error) {
        console.log("Error in comment on posts", error);
        return res.status(500).json({ error: "Internal server error" });

    }
}