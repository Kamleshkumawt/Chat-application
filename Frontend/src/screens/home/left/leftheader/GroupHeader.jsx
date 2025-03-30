import React, { useState } from "react";         
import { CgProfile } from "react-icons/cg";
import GroupChat from "./GroupChat";
import MessageGroup from "../../right/MesaageGroup";
import Iosearch from "./Iosearch";




const GroupHeader = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
     
  return (
    <div>
    <div className="flex flex-col items-center px-5 py-4 bg-[#2b2b2b] gap-2">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-xl font-semibold text-white ">Chats</h1>
        <div className="flex gap-5 text-white text-lg">
          <button onClick={() => setIsModalOpen(true)}  >
            <GroupChat/>
          </button>
          <div>
            <h1>
              <CgProfile />
            </h1>
          </div>
        </div>
      </div>
      <Iosearch/>
    </div>
    {isModalOpen && (
    <div className="fixed w-full inset-0 flex items-center ml-14 z-50">
      <GroupChat/>
      <MessageGroup/>
    </div>
    )}
  </div>
);
};

export default GroupHeader