import Notification from "../model/notification.model.js";

export const getAllNotification = async (req, res) => {
    try {
        const userId = req.user._id;
        const notifications = await Notification.find({ to: userId }).select("-to")
            .populate({
                path: "from",
                select: "username profileImg"
            })

        await Notification.updateMany({ to: userId }, { read: true });

        if (!notifications) {
            return res.status(400).json({ error: "No Notifications Found" })
        }
        res.status(200).json(notifications)
    } catch (error) {

        console.log("Error in getAllNotification", error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

export const deleteAllNotification = async (req, res) => {
    try {
        const userId = req.user._id;
        await Notification.deleteMany({ to: userId })

        return res.status(200).json({ mesege: "All Notification Deleted" })
    } catch (error) {
        console.log("Error in deleteAllNotification", error)
        return res.status(500).json({ error: "Internal Server Error" })
    }



}