import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import userModel from "../models/userModel.js";
import bycrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    let verifyEmail = await userModel.findOne({ email });
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: "All Feiled Required" });
    }
    if (!verifyEmail) {
      const salt = await bycrypt.genSalt(10);
      console.log(salt, "salt");
      const hashedPassword = await bycrypt.hash(password, salt);
      const newuser = new userModel({
        fullName,
        email,
        password: hashedPassword,
      });
      if (newuser) {
        generateToken(newuser._id, res);
        await newuser.save();
        return res
          .status(201)
          .json({ message: " User registration successful ",data:newuser });
      } else {
        return res.status(400).json({ error: "Invalide User Data " });
      }
    } else {
      return res.status(400).json({ error: "User Alrady exist" });
    }
  } catch (error) {
    console.log("error ", error.message);

    return res.status(500).json({ error: "Server Error !" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Invalid Credentials !!" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(404).json({ error: "Invalid Credentials !!" });
    }
    generateToken(user._id, res);
    return res.status(200).json({ message: "  Login successful ",data:user });
  } catch (error) {
    console.log("error ", error.message);
    return res.status(500).json({ error: "Server Error !" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "  Logout successful " });
  } catch (error) {
    console.log("error ", error.message);
    return res.status(500).json({ error: "Server Error !" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilPic } = req.body;
    const userId = req.user._id;
    if (!profilPic) {
      return res.status(400).json({ error: "profilPic not found  !" });
    }
    const uploadUrl = await cloudinary.uploader.upload(profilPic);
    const updateUser = await userModel.findByIdAndUpdate(
      userId,
      { profilePic: uploadUrl.secure_url },
      { new: true }
    );
    return res.status(200).json({ message: " profile Updated ! ",data:updateUser });
  } catch (error) {
    return res.status(500).json({ error: "Server Error !" });
  }
};

export const getUserInfo = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("error ", error.message);
    return res.status(500).json({ error: "Server Error !" });
  }
};
