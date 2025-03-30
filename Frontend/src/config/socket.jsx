import React, { useContext } from "react";
import socket from "socket.io-client";
import { setOnlineUsers } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { UserContext } from "../context/User.context";


const Socket = () => {
    const dispatch = useDispatch();
    const {user} = useContext(UserContext)
    let socketInstance = null;

const initializeSocket = (userId) => {

    socketInstance = socket(import.meta.env.VITE_API_URL, {
      auth: {
        token: localStorage.getItem("token"),
      },
      query: {
        userId,
      },
    });

    socketInstance.on("getOnlineUsers", (onlineUsers) => {
      console.log("Online Users:", onlineUsers);
      dispatch(setOnlineUsers(onlineUsers));
    });
    // console.log('UserId:',userId);
    console.log(socketInstance);

    return socketInstance;
  };

  return initializeSocket;
};

export default Socket;
