import React, { useContext, useEffect, useState }  from "react";
import { IoCameraOutline, IoClose } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { MdErrorOutline, MdOutlineLocalPhone } from "react-icons/md";
import axios from "../../../../config/axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../context/User.context";
import { useSelector } from "react-redux";
// Removed unused import of authUser

const Profile = ({ setIsModalProfile }) => {
  const [users, setUsers] = useState('')
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const {authUser} = useSelector(store=>store.user);

  // console.log("User:", authUser);

useEffect(() => {
  
    axios
      .get("/users/Profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUsers(res.data.user);
        // console.log("User:", res.data.user);
      })
      .catch((err) => {
        console.error(err);
      });

}, [])

  const loggOut = () => {
    axios
      .get("/users/logout", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        localStorage.removeItem("token");
        // window.location.reload();
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <div className="fixed flex flex-col items-center gap-10 pt-5 inset-0 w-96 transition-all top-0 z-50 bg-[#2b2b2b]">
        <div className=" flex w-full items-center justify-end px-6 ">
          <button
            className="cursor-pointer hover:text-red-400"
            onClick={() => setIsModalProfile(false)}
          >
            <IoClose />
          </button>
        </div>
        <div className="relative">
          <img
            className="object-cover w-32 h-32 rounded-full "
            src="https://i.pinimg.com/originals/3b/14/04/3b1404dabe8a3897358832181616d23f.jpg"
          />
          <div className="absolute flex items-center justify-center text-xl text-black bg-green-400 h-9 w-9 right-0 bottom-2 rounded-full">
            <IoCameraOutline />
          </div>
        </div>
        <div className="flex flex-col gap-5 ml-12 w-full">
          <div className="flex items-center gap-4">
            <span>
              <FaRegUser />
            </span>
            <div className="leading-3">
              <h1 className="font-semibold">Name</h1>
              <span className="text-sm">{user?.fullname}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>
              <MdErrorOutline />
            </span>
            <div className="leading-3">
              <h1 className="font-semibold">About</h1>
              <span className="text-sm">Hello i'm Kamlesh kumawat</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>
              <MdOutlineLocalPhone />
            </span>
            <div className="leading-3">
              <h1 className="font-semibold">Email</h1>
              <span className="text-sm">{users?.email}</span>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center gap-2 mt-65 ml-12">
          <span>
            <BiLogOut />
          </span>
          <button
            className="text-xl font-semibold p-1 cursor-pointer hover:text-red-300 "
            onClick={loggOut}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
