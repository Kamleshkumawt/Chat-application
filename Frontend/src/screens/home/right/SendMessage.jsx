import React, { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import axios from "../../../config/axios";
import { useSelector } from "react-redux";
import { MdMicNone } from "react-icons/md";

const SendMessage = ({ messages, setMessages }) => {
  const [message, setMessage] = useState("");
  const { selectedUser } = useSelector((store) => store.user);
  const [buttonIsLoading, setButtonIsLoading] = useState(false);
  const [letterCount, setLetterCount] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null); // Using useRef
  const audioChunks = useRef([]); // To persist audio chunks

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
      setLetterCount(null);
    } catch (e) {
      console.error(e);
      console.log(e);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      SendMessages(e);
    }
  };
  const handleInputChange = (e) => {
    const inputMessage = e.target.value;
    setMessage(inputMessage);
    setLetterCount(inputMessage.length);
    // console.log(inputMessage);
  };


  useEffect(() => {
    setButtonIsLoading(letterCount > 0);
  }, [letterCount]);

  const startRecording = async () => {
    try {
      setIsRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream); // Assign to ref

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        console.log("MediaRecorder stopped.");
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        const formData = new FormData();
        // formData.append("audio", audioBlob);
        formData.append("audioFile", audioBlob); // Corrected key name

        const selectedUserId = `${selectedUser._id}`; // replace with the actual receiver ID

        // console.log("formData: " + formData);
        // console.log("formDataAudioBlob: " + audioBlob);
        try {
          const res = await axios.post(`/audio/uploads/${selectedUserId}`, formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          const audioFileName = res?.data?.audio?.audioFile;

          // const audioUrl = URL.createObjectURL(res?.data?.audio);
          const audioUrl = `/uploads/${audioFileName}`; // Assuming the file is served from the uploads folder
 
          setMessages([...messages, { type: 'audio', audioUrl }]);

          console.log("Audio uploaded successfully!", res?.data?.audio);
        } catch (error) {
          console.log("Error uploading audio:", error);
          console.error("Upload failed:", error);
        }

        audioChunks.current = []; // Clear after upload
      };

      mediaRecorderRef.current.onerror = (event) => {
        console.error("MediaRecorder error:", event.error);
      };

      mediaRecorderRef.current.start();
      console.log("Recording started...");
    } catch (error) {
      console.error("Microphone access denied:", error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    console.log("Attempting to stop recording...");
    const mediaRecorder = mediaRecorderRef.current; // Access from ref

    if (mediaRecorder) {
      if (mediaRecorder.state !== "inactive") {
        console.log("Stopping recorder...");
        setIsRecording(false);
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach((track) => track.stop());
        console.log("Recording stopped successfully.");
      } else {
        console.warn(
          "MediaRecorder is inactive. No recording was in progress."
        );
      }
    } else {
      console.warn("No mediaRecorder found. Ensure recording has started.");
    }
  };

  return (
    <div>
      <form onSubmit={SendMessages} className="bg-[#404040] flex">
        <audio id="audioPlayer" controls>
          {" "}
          Play
        </audio>
        <input
          type="text"
          className="w-full p-2 outline-none"
          placeholder="Type message..."
          value={message}
          onKeyDown={handleKeyPress}
          onChange={handleInputChange}
          required
        />
        {buttonIsLoading ? (
          <button
            className="px-3 text-xl hover:bg-[#454547] hover:text-green-400 cursor-pointer "
            type="submit"
          >
            <IoIosSend />
          </button>
        ) : (
          <div
            className={`px-3 p-2 text-xl hover:bg-[#454547] hover:text-green-400 cursor-pointer 
              ${isRecording ? "opacity-100" : "opacity-90"}
             ${isRecording ? "text-green-400" : ""}`}
            //  onClick={() => setIsRecording(!isRecording)}
            onClick={isRecording ? stopRecording : startRecording}
          >
            <MdMicNone />
          </div>
        )}
      </form>
    </div>
  );
};

export default SendMessage;
