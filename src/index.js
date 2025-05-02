import express from "express";
import doent from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

doent.config();
const PORT = process.env.PORT;

import authRoutes from "./routes/authRouter.js";
import messageRoute from "./routes/messageRouter.js";
import { dbConnect } from "./lib/dbConnect.js";
import { app, server } from "./lib/socket.js";
app.use(express.json({ limit: "10mb" })); // or even more if needed
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);

server.listen(PORT, () => {
  console.log(`listing on PORT ${PORT}`);
  dbConnect();
});
