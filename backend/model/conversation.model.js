import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"user",
            required: true
        }
    ],
    messeges:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "messege",
            default : [],
        }
    ]
}, {timestamps: true})

const Conversation = mongoose.model("conversation", conversationSchema);

export default Conversation;