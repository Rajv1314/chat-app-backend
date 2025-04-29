import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'Users'
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Users'
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


const messageModel = mongoose.model('Messages',messageSchema);
export default messageModel