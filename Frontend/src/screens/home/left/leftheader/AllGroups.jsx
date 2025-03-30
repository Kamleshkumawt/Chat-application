import React, { useState, useEffect } from "react";
import axios from "../../../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUserGroup } from "../../../../redux/userSlice";


const AllGroups = () => {
  const {selectedUserGroup, searchQuery } = useSelector((store) => store.user);
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();

  
 const setSelectedUserHandler = (user) => {
     dispatch(setSelectedUserGroup(user));
    //  console.log("User: UserId", user);
   };
 
  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("/projects/get-all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.Project);
        // console.log("user Project:", response.data.Project);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    getData();
  }, []);


  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );

  // console.log("filteredUsers:", filteredUsers);
  // console.log("Search Query:", searchQuery);



  return (
    <div>
      <div className="bg-[#151515]  text-white p-1 max-h-[86vh]">
        <div className="flex flex-col gap-2 max-h-[86vh] overflow-auto">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className={`user flex items-center rounded-md px-3 py-2 gap-4 hover:bg-[#555555] cursor-pointer 
                ${selectedUserGroup?._id === user._id ? "bg-[#555555]" : ""}`}
              onClick={() => setSelectedUserHandler(user)}
            >
              <div className="bg-red-500 rounded-full overflow-hidden">
              <img className=" w-12 h-12" src={ user?.image ||"https://i.pinimg.com/originals/3b/14/04/3b1404dabe8a3897358832181616d23f.jpg"} />
              </div>
              <small className="text-[15px] font-semibold">{user.name}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllGroups;







{
  /*import React, { useState,useContext, useEffect} from 'react'
import { UserContext } from '../../../../context/User.context';
import axios from '../../../../config/axios';

const AllGroups = () => {
 const [selectedUserId, setSelectedUserId] = useState([]);
  const [users, setUsers] = useState([]);

  const { user } = useContext(UserContext);

  console.log(user);

  const handleUserClick = (id) => {
    setSelectedUserId((prevSelectedUserId) => {
      const newSelectedUserId = new Set(prevSelectedUserId);
      if (newSelectedUserId.has(id)) {
        newSelectedUserId.delete(id);
      } else {
        newSelectedUserId.add(id);
      }
      return newSelectedUserId;
    });
  };

  function addCollaborators() {
    console.log('addCollaborators');
  }


  useEffect(() =>  {


    const getData = async () => {
      
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.get('/projects/get-all',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      setUsers(response.data.Project);
      console.log('user Project:',response.data.Project);

    } catch (error) {
      console.error('Error fetching users', error);
    }
    }

    getData();
  }, [])
  

  return (
    <div>
       <div className='hover:bg-[#555555] bg-[#151515]'>
       <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white text-black p-6 rounded-md shadow-md w-full max-w-md'>
            <div className='flex justify-between'>
               <h2 className='text-xl mb-4 font-semibold'>Users List</h2> 
              <button className='p-2 text-sm hover:text-gray-800 cursor-pointer' >
                <i className='ri-close-large-fill pt-1'></i>
              </button>
            </div>
            <div className='flex flex-col gap-2 max-h-80 overflow-auto'>
              {users.map((user) => (
                <div
                  key={user.id}
                  className={`user flex gap-2 items-center p-2 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer ${
                    Array.from(selectedUserId).indexOf(user._id) !== -1 ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => handleUserClick(user._id)}
                >
                  <div className='aspect-square relative rounded-full p-5 flex items-center justify-center text-white w-fit h-fit bg-blue-200'>
                    <i className='ri-user-fill absolute'></i>
                  </div>
                  <small className='text-[15px] font-semibold'>{user.name}</small>
                </div>
              ))}
            </div>
            <div className='flex justify-end mt-4'>
              <button onClick={addCollaborators} className='px-4 py-2 bg-gray-300 rounded-md cursor-pointer'>
                add collaborator
              </button>
            </div>
          </div>
        </div>
       </div>
    </div>
  )
}

export default AllGroups
*/
}