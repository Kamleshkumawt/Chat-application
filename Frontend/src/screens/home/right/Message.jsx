import React, { useContext, useEffect, useRef } from "react";
import UseGetMessage from "../../../statemange/UseGetMessage";
import { UserContext } from "../../../context/User.context";
import SendMessage from "./SendMessage";
const Message = () => {
  const { messages, loading , setMessages } = UseGetMessage();
  const { user } = useContext(UserContext);
  const messagesEndRef = useRef(null);
  // const {onlineUsers} = useSelector(store=>store.user);


  // console.log("UserOnline Messages:", onlineUsers);

  useEffect(() => {
    console.log("User data or messages have changed!",messages);
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
      {messages.length === 0 ? (
        <div className="h-[84.9vh] flex items-center justify-center overflow-auto">
          <div className="skeleton h-full w-full flex items-center justify-center ">
            <p>Let's start chat</p>
          </div>
        </div>
      ) : (
        <div className="p-1 h-[84.9vh] overflow-auto">
          {messages?.map((message,index) => {
            const itsme = message.senderId === user._id;
            const chatName = itsme ? "chat-end" : "chat-start";
            const setColorName = itsme ? "chat-bubble-warning" : "chat-bubble-success";
            const createdAt = `${message.createdAt}`;
            const time = new Date(createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              // key={message._id}
              <div  key={`${message._id}-${index}`} className={`chat ${chatName}`}>
                <div className={`chat-bubble ${setColorName}`}>
                  {/* {message.message} */}
                  {message.type === "audio" ? (
              <audio controls style={{ width: "100%" }}>
                <source src={message.audioUrl} type="audio/webm" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <p>{message.message}</p>
            )}
            {/* llll */}
                </div>
                <div className="chat-footer opacity-50">{time}</div>
              </div>
            );
          })}
        <div ref={messagesEndRef} />
        </div>
      )}

      <SendMessage messages={messages} setMessages={setMessages} />
    </div>
  );
};

export default Message;
