import React, { useState, useEffect, useContext} from 'react';
import axios from '../config/axios';
import { useDispatch, useSelector } from 'react-redux';
import { io } from "socket.io-client";
import { setOnlineUsers } from "../redux/userSlice";
import { UserContext } from '../context/User.context';



const UseGetMessage = () => {
  const {selectedUser,authUser} = useSelector(store=>store.user)
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);
  
  // console.log('selectedUserId:', selectedUser?._id);
  // console.log('AuthUser:', authUser);

    const fetchMessages = async (selectedUserId) => {

      try {
        const res = await axios.get(`/messages/${selectedUserId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setMessages(res.data);  // Set the fetched messages to state
        // dispatch(setMessages(res.data))
        
        // console.log('Messages:', res.data.message);
      } catch (e) {
        setError(e); 
        // console.error(e);
      } finally {
        setLoading(false);  // Set loading to false once the request is complete
      }
    };

      useEffect(() => {
        const initializeSocket = (userId) => {
          const socket = io(import.meta.env.VITE_API_URL, {
            auth: {
              token: localStorage.getItem("token"),
            },
            query: {
              userId,
            },
          });
    
          socket.on("getOnlineUsers", (onlineUsers) => {
            // console.log("Online Users:", onlineUsers);
            dispatch(setOnlineUsers(onlineUsers));
          });
          // console.log('UserId:',userId);
    
          socket.on("newMessage", (newMessage) => {
            // // console.log("Online Users:", onlineUsers);
            // if (newMessage.sender._id === selectedUser._id) {
            //   setMessages((prevMessages) => [...prevMessages, newMessage]);
            // }
            setMessages([...messages, newMessage]);

          });
          return () => {
            socket.off("newMessage");  
          };
    
        };
    
    
        const userId = authUser._id;
        initializeSocket(userId);
      }, [authUser,setMessages,messages]); // Disconnect when user changes to avoid multiple connections
    

  useEffect(() => {
    fetchMessages(selectedUser?._id);

  }, [selectedUser]);

  return { messages: messages || [], loading, error, setMessages };  // Ensure messages is always an array
};

export default UseGetMessage;
