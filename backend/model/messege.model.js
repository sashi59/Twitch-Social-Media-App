import mongoose from "mongoose";

const messegeSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    messege:{
        type: String,
        required: true,
    }
}, {timestamps: true})

const Messege = mongoose.model("messege", messegeSchema);

export default Messege;