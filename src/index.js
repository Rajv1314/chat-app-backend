import express from "express";
import doent from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
doent.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();
import authRoutes from "./routes/authRouter.js";
import messageRoute from "./routes/messageRouter.js";
import { dbConnect } from "./lib/dbConnect.js";
import { app, server } from "./lib/socket.js";
app.use(express.json({ limit: "10mb" })); // or even more if needed
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`listing on PORT ${PORT}`);
  dbConnect();
});
