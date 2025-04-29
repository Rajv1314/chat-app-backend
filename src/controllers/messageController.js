import cloudinary from "../lib/cloudinary.js";
import { getReceiverSoketId, io } from "../lib/socket.js";
import messageModel from "../models/messageModel.js";
import userModel from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const filterUsers = await userModel
      .find({ _id: { $ne: userId } })
      .select(-"password");
    return res.status(200).json({ message: "users !", data: filterUsers });
  } catch (error) {
    console.log("error ", error.message);
    return res.status(500).json({ error: "Server Error !" });
  }
};


export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.auth.userId;
    const messages = await messageModel.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    return res.status(200).json({ message: "messages !", data: messages });
  } catch (error) {
    console.log("error ", error.message);
    return res.status(500).json({ error: "Server Error !" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { text, image } = req.body;
    const senderId = req.auth.userId;
    let imageUrl;
    if (image) {
      const uploadUrl = await cloudinary.uploader.upload(image);
      imageUrl = uploadUrl.secure_url;
    }
    const newMessage = await messageModel.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    const receiverSoketId = getReceiverSoketId(receiverId)
    if (receiverSoketId) {
      io.to(receiverSoketId).emit('newMessage',newMessage)
    }
    return res.status(201).json({ message: "message sent!", data: newMessage });
  } catch (error) {
    console.log("error ", error.message);
    return res.status(500).json({ error: "Server Error !" });
  }
};
