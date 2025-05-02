import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173",process.env.FRONTEND_URL],
  },
});
export function getReceiverSoketId(userId){
  return userSoketMap[userId]
}
// to store online users
const userSoketMap = {};
io.on("connection", (socket) => {
  console.log(`A user Is connected `, socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) userSoketMap[userId] = socket.id;
  //io.emit() is used to send events to all the connected users
  io.emit("getOnlineUsers", Object.keys(userSoketMap));
  socket.on("disconnect", () => {
    console.log(`A user Is disconnect`, socket.id);
    delete userSoketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSoketMap));
  });
});
export { app, io, server };
