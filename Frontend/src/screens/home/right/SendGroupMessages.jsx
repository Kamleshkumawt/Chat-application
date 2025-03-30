import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import axios from "../../../config/axios";
import { useSelector } from "react-redux";

const SendGroupMessages = ({ messages, setMessages }) => {
  const [message, setMessage] = useState("");
  const { selectedUser } = useSelector((store) => store.user);

  const SendMessages = async (e) => {
    e.preventDefault();
    const selectedUserId = `${selectedUser._id}`; // replace with the actual receiver ID
    // console.log("receiverId", selectedUserId);

    try {
      const res = await axios.post(
        `/messages/send/${selectedUserId}`,
        {
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessages([...messages, res?.data?.newMessage]);
      setMessage("");
    } catch (e) {
      console.error(e);
      console.log(e);
    }
  };

  return (
    <div>
      <form onSubmit={SendMessages} className="bg-[#404040] flex">
        <input
          type="text"
          className="w-full p-2 outline-none"
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button
          className="px-3 text-xl hover:bg-[#404055] hover:text-green-400"
          type="submit"
        >
          <IoIosSend />
        </button>
      </form>
    </div>
  );
};

export default SendGroupMessages;
