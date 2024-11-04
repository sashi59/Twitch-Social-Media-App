import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary"
import User from "../model/user.model.js";
import Notification from "../model/notification.model.js";

export const getUserProfile = async (req, res) => {
    try {
        const username = req.params;
        const user = await User.findOne(username).select("-password");
        if (!user) {
            return res.status(400).json({ error: "User Not Found" })
        }

        res.status(200).json(user);
    } catch (error) {

        console.log("Error in getUserProfile", error.messege)
        return res.status(500).json({ error: "Internal Server Error" })
    }



}

export const followUnfollowUser = async (req, res) => {

    try {
        const { id } = req.params;
        const toModifyUser = await User.findById(id).select("-password");
        const currentUser = await User.findById(req.user._id).select("-password");
    
        if (!toModifyUser || !currentUser) {
            return res.status(400).json({ error: "No user Found" });
        }
    
        if (id === req.user._id.toString()) {
            return res.status(400).json({ error: "You can't follow or unfollow yourself" });
        }
    
        const isFollowing = currentUser.following.includes(id);
    
        if (isFollowing) {
            // Unfollow
            await User.findByIdAndUpdate(id, { $pull: { follower: req.user._id } });
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
            return res.status(200).json({ message: "Unfollowing success" });
        } else {
            // Follow
            await User.findByIdAndUpdate(id, { $push: { follower: req.user._id } });
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
    
            const notification = await Notification.create({
                from: req.user._id,
                to: id,
                type: "follow",
            });
            await notification.save();
    
            return res.status(200).json({ message: "Following success" });
        }
    } catch (error) {
        console.log("Error in followUnfollow:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
    

}

export const getSuggestedUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const userFollwedByMe = await User.findById(userId).select("following");

        const users = await User.aggregate([
            {
                $match: {
                    _id: { $ne: userId }
                }
            }, {
                $sample: {
                    size: 10
                }
            }
        ])
        const filterUser = users.filter((user) => !userFollwedByMe.following.includes(user._id));

        const suggestedUser = filterUser.slice(0, 4);
        suggestedUser.forEach((user) => (user.password = null));

        return res.status(200).json(suggestedUser);
    } catch (error) {
        console.log("Error in getSuggestedUser", error)
        return res.status(500).json({ error: "Internal Server Error" })
    }

}

export const updateUserProfile = async (req, res) => {

    const { fullName, email, username, currentPassword, newPassword, bio, link } = req.body;
    let { profileImg, coverImg } = req.body;
    const userId = req.user._id;
    try {
        let user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        if ((!newPassword && currentPassword) || (!currentPassword && newPassword)) {
            return res.status(400).json({ error: "Please provide both current password and new password" });
        }
        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });
            if (newPassword.length < 6) {
                return res.status(400).json({ error: "Password must be at least 6 characters long" });
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }
        if (profileImg) {
            if (user.profileImg) {
                // https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
                await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
            }
            const uploadedResponse = await cloudinary.uploader.upload(profileImg);
            profileImg = uploadedResponse.secure_url;
        }
        if (coverImg) {
            if (user.coverImg) {
                await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]);
            }
            const uploadedResponse = await cloudinary.uploader.upload(coverImg);
            coverImg = uploadedResponse.secure_url;
        }
        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.username = username || user.username;
        user.bio = bio || user.bio;
        user.link = link || user.link;
        user.profileImg = profileImg || user.profileImg;
        user.coverImg = coverImg || user.coverImg;
        user = await user.save();
        // password should be null in response
        user.password = null;
        return res.status(200).json(user);
    } catch (error) {
        console.log("Error in updateUser: ", error.message);
        res.status(500).json({ error: error.message });
    }

}