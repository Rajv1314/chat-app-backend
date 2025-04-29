import express from "express";
import { verifyUserToken } from "../middlewares/authUserMiddleware.js";
import { getMessages, getUsers, sendMessage } from "../controllers/messageController.js";
const router = express.Router();
router.get("/getUsers",verifyUserToken,getUsers);
router.get("/:id",verifyUserToken,getMessages);
router.post("/send/:id",verifyUserToken,sendMessage);

export default router;
