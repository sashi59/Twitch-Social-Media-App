import Conversation from "../model/conversation.model.js";
import Messege from "../model/messege.model.js";

export const getMesseges = async (req, res) => {
    try {
        const { id:receiverId } = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants:{
                $all: [senderId, receiverId],
            }
        }).populate("messeges")

        if(!conversation){
            return res.status(200).json([]);
        }

        const messages =  conversation.messeges;
        return res.status(200).json(messages);
        
        //hello
    } catch (error) {
       console.log("Error in getMesseges", error);
       return res.status(500).json({ error: "Internal Server Error" }); 
    }
}

export const sendMesseges = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        const { messege } = req.body;

        let conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId],
            }
        }).populate("messeges");

        if (!conversation) {
            conversation = new Conversation({
                participants: [senderId, receiverId],
            });
        }

        const newMessege = await Messege.create({
            senderId,
            receiverId,
            messege,
        })

        if (newMessege) {
            conversation.messeges.push(newMessege._id);
        }
        await Promise.all([
            await conversation.save(),
            await newMessege.save(),

        ])

        return res.status(201).json(newMessege);

    } catch (error) {
        console.log("Error in sending messege", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }


}