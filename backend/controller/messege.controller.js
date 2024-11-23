// import Message from "../../frontend/src/pages/messege/messegeContainer/Message.jsx";
import Conversation from "../model/conversation.model.js";
import Messege from "../model/messege.model.js";
import { getReceiverSocketId , io } from "../socket/socket.js";

export const getMesseges = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        console.log("Sender ID:", senderId); // Debugging
        console.log("Receiver ID:", receiverId); // Debugging
        const conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId],
            }
        }).populate("messeges")

        if (!conversation) {
            const conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
            return res.status(200).json({conversation});
        }

        const messages = conversation.messeges;
        console.log("Messages: ::", messages);
        return res.status(200).json(messages);

        //hello
    } catch (error) {
        console.log("Error in getMesseges", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const sendMesseges = async (req, res) => {
    try {
        const { messege } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = await  Messege.create({
			senderId,
			receiverId,
			messege,
		});

		if (newMessage) {
			conversation.messeges.push(newMessage._id);
		}
        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sending message", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
