import React, { useEffect, useState } from "react";
import axios from "../../../../config/axios";
import { setSelectedUser } from "../../../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { selectedUser, searchQuery } = useSelector((store) => store.user);
  const { onlineUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  // const isUserOnline = onlineUsers.includes(users._id);


  const setSelectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
    // console.log("User: UserId", user);
  };

  useEffect(() => {
    // Fetch user data from the API
    const userData = async () => {
      await axios
        .get("/users/all-users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setUsers(res.data.allUsers);
          // console.log("User:", res.data.allUsers);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    userData();
  }, []);

  // console.log("UserOnline:", onlineUsers);
  // Filter users based on the search query
  const filteredUsers = users.filter((user) =>
    user.fullname?.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );

  return (
    <div>
  {filteredUsers.map((user) => {
    const isUserOnline = onlineUsers.includes(user._id);  // Move logic before JSX
    return (
      <div
        key={user._id}
        className={`flex items-center px-3 rounded py-2 gap-4 hover:bg-[#555555] cursor-pointer
        ${selectedUser?._id === user._id ? "bg-[#555555]" : ""}`}
        onClick={() => setSelectedUserHandler(user)}
      >
        <div className={`avatar ${isUserOnline ? "avatar-online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
              src={
                user.image ||
                "https://i.pinimg.com/originals/3b/14/04/3b1404dabe8a3897358832181616d23f.jpg"
              }
              alt={user.fullname}  // It's a good practice to add an alt tag for images
            />
          </div>
        </div>
        <div>
          <h1 className="font-semibold">{user.fullname}</h1>
          <span className="text-sm">{user.email}</span>
        </div>
      </div>
    );
  })}
</div>

    // <div>
    //   {filteredUsers.map((user) => (
    //     const isUserOnline = onlineUsers.includes(user._id);
    //     <div
    //       key={user._id}
    //       className={`flex items-center px-3 rounded py-2 gap-4 hover:bg-[#555555] cursor-pointer
    //       ${selectedUser?._id === user._id ? "bg-[#555555]" : ""}
    //       }`}
    //       onClick={() => setSelectedUserHandler(user)}
    //     >
    //       <div className={`avatar ${isUserOnline ? "avatar-online" : ""}`}>
    //         <div className="w-12 rounded-full">
    //           <img
    //             src={
    //               user.image ||
    //               "https://i.pinimg.com/originals/3b/14/04/3b1404dabe8a3897358832181616d23f.jpg"
    //             }
    //           />
    //         </div>
    //       </div>
    //       <div>
    //         <h1 className="font-semibold">{user.fullname}</h1>
    //         <span className="text-sm">{user.email}</span>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
};

export default Users;
