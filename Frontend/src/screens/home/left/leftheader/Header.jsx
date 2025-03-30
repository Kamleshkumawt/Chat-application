import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { MdGroups2 } from "react-icons/md";
import GroupChat from "./GroupChat";
import AllGroups from "./AllGroups";
import Profile from "./Profile";
// import { useDispatch } from "react-redux";
// import { setSearchQuery } from "../../../../redux/userSlice";
import Iosearch from "./Iosearch";
import MessageGroup from "../../right/MesaageGroup";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalProfile, setIsModalProfile] = useState(false);
  // const dispatch = useDispatch();

  // const searchHandler = (e) => {
  //   dispatch(setSearchQuery(e.target.value)); // Redux action to update search user state
  // };

  return (
    <div>
      <div className="flex flex-col items-center px-5 py-4 bg-[#2b2b2b] gap-2">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl font-semibold text-white ">Chats</h1>
          <div className="flex gap-5 text-white text-lg">
            <button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer opacity-90 hover:opacity-100"
            >
              {/* <MdGroupAdd /> */}
              <MdGroups2 />
            </button>
            <div>
              <h1
                className="cursor-pointer opacity-90 hover:opacity-100 text-green-600"
                onClick={() => setIsModalProfile(true)}
              >
                <CgProfile />
              </h1>
            </div>
          </div>
        </div>


        <Iosearch/>

        {/* <div
          className="w-full flex hover:border-b border-b  active:border-green-400 bg-[#404040] text-[#f4f4f4] items-center rounded pl-2"
        >
          <CiSearch className="rotate-90" />
          <input
            type="text"
            onChange={searchHandler}
            className="w-full p-1 outline-none"
            placeholder="Search or start a new chat..."
          />
          <div></div>
        </div> */}

      </div>
      {isModalOpen && (
        <div className=" flex fixed transition-all top-0 z-50 ">
        <div className="inset-0 w-96 transition-all top-0 z-50">
          <GroupChat setIsModalOpen={setIsModalOpen} />
          <div>
            <AllGroups />
          </div>
        </div>
        <div>
          <MessageGroup/>
        </div>
          </div>
      )}

      {isModalProfile && (
        // <div className="fixed flex flex-col items-center gap-10 pt-5 inset-0 w-96 transition-all top-0 z-50 bg-[#2b2b2b]">
        //   <div className=" flex w-full items-center justify-end px-6 ">
        //     <button className="cursor-pointer hover:text-red-400" onClick={() => setIsModalProfile(false)} >
        //     <IoClose />
        //     </button>
        //   </div>
        //   <div className="relative">
        //   <img className="object-cover w-32 h-32 rounded-full " src="https://i.pinimg.com/originals/3b/14/04/3b1404dabe8a3897358832181616d23f.jpg" />
        //   <div className="absolute flex items-center justify-center text-xl text-black bg-green-400 h-9 w-9 right-0 bottom-2 rounded-full">
        //   <IoCameraOutline />
        //   </div>
        //   </div>
        //   <div className="flex flex-col gap-5 ml-12 w-full">
        //     <div className="flex items-center gap-4">
        //       <span><FaRegUser />
        //       </span>
        //       <div className="leading-3">
        //         <h1 className="font-semibold">Name</h1>
        //         <span className="text-sm">Kamlesh</span>
        //       </div>
        //     </div>
        //     <div className="flex items-center gap-4">
        //       <span>
        //       <MdErrorOutline />
        //       </span>
        //       <div className="leading-3">
        //         <h1 className="font-semibold">About</h1>
        //         <span className="text-sm">Hello i'm Kamlesh kumawat</span>
        //       </div>
        //     </div>
        //     <div className="flex items-center gap-4">
        //       <span>
        //       <MdOutlineLocalPhone />
        //       </span>
        //       <div className="leading-3">
        //         <h1 className="font-semibold">Email</h1>
        //         <span className="text-sm">kam@gmail.com</span>
        //       </div>
        //     </div>
        //   </div>
        //   <div className="flex w-full items-center gap-2 mt-65 ml-12">
        //     <span>
        //       <BiLogOut />
        //     </span>
        //   <button className="text-xl font-semibold p-1 cursor-pointer ">Logout</button>
        //   </div>
        // </div>
        <Profile setIsModalProfile={setIsModalProfile} />
      )}
    </div>
  );
};

export default Header;
