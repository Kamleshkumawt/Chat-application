import React, { useContext, useEffect, useRef } from "react";
import UseGetMessage from "../../../statemange/UseGetMessage";
import { UserContext } from "../../../context/User.context";
import SendGroupMessages from "./SendGroupMessages";
// import RightHeader from "./RightHeader";
import MessageGroupHeader from "./MessageGroupHeader";
import { useSelector } from "react-redux";
//import SendMessage from "./SendMessage";


const MessageGroup = () => {
  const { messages, loading , setMessages } = UseGetMessage();
  const { user } = useContext(UserContext);
  const messagesEndRef = useRef(null);
  const { searchChatQuery } = useSelector((store) => store.user)
  // const {onlineUsers} = useSelector(store=>store.user);

  // console.log('searchChatQuery',searchChatQuery);

  // console.log("UserOnline Messages:", onlineUsers);

  useEffect(() => {
    // console.log("User data or messages have changed!");

  }, [messages]);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // This effect runs when 'messages' changes

  if (loading) return <p>Loading messages...</p>;
  // if (error) return <p>Error loading messages: {error.message}</p>;

  // if (!messages || messages.length === 0) return <p>No messages to display</p>;

  // console.log("Fetched messages:", messages);

  return (
    <div>
      <div className="w-[71.5rem]">
      {/* <RightHeader/> */}
      <MessageGroupHeader/>
      {messages.length === 0 ? (
        <div className="h-[84.9vh] flex items-center justify-center overflow-auto">
          <div className="skeleton h-full w-full flex items-center justify-center ">
            <p>Let's start Group-chat</p>
          </div>
        </div>
      ) : (
        <div className="p-1 h-[84.9vh] overflow-auto">
          {messages?.map((message) => {
            const itsme = message.senderId === user._id;
            const chatName = itsme ? "chat-end" : "chat-start";
            const setColorName = itsme ? "chat-bubble-warning" : "chat-bubble-success";
            const createdAt = `${message.createdAt}`;
            const time = new Date(createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <div key={message._id} className={`chat ${chatName}`}>
                <div className={`chat-bubble ${setColorName}`}>
                  {message.message}
                </div>
                <div className="chat-footer opacity-50">{time}</div>
              </div>
            );
          })}
        <div ref={messagesEndRef} />
        </div>
      )}
      <SendGroupMessages messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
};

export default MessageGroup;
