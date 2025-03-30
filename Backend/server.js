import "dotenv/config.js";
import app from "./app.js";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
// import userModel from "./models/user.model.js";
import ProjectModel from "./models/project.model.js";



const port = process.env.PORT || 3000;

const server = http.createServer(app);
export const io = new Server(server,{
  cors: {
    origin: '*',
  }
});


io.use(async(socket, next) => {
  try {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.authorization?.split(" ")[1];

    const userId = socket.handshake.query.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }

    // console.log("User ID: " + userId);

    // socket.project = await ProjectModel.findById(userId);


    if (!token) {
      throw new Error("Authentication error");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      throw new Error("Authentication error");
    }

    socket.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//real time messages will be sent
export const getReceiverSocketId = (receierId) =>{
  return userSocketMap[receierId];
}

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("a user connected....");

  const userId = socket.handshake.query.userId;

  // console.log("User ID: " + userId);

  if(userId !== undefined) {
    userSocketMap[userId] = socket.id;
  }


  io.emit('getOnlineUsers',Object.keys(userSocketMap));

  //real time messages will be sent
  // io.on("message", (msg) => {
  //   console.log("Message received: ", msg);
  //   io.emit("message", msg);
  // });

  // io.on("typing", (userId) => {
  //   console.log("User is typing: ", userId);
  //   io.to(userSocketMap[userId]).emit("typing", userId);
  // });

  // socket.join(socket.project._id);
  // socket.on("message", (msg) => {
  //   io.to(socket.project._id).emit("message", msg);
  // });

  socket.on("event", (data) => {
    /* … */
  });
  socket.on("disconnect", () => {
    console.log("a user Disconnected....");
    delete userSocketMap[userId];
    io.emit('getOnlineUsers',Object.keys(userSocketMap));
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}.....`);
});
