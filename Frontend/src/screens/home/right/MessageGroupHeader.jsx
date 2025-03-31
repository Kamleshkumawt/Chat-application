import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { MdGroupAdd, MdPersonAddAlt1 } from "react-icons/md";
import axios from "../../../config/axios"
import { IoClose } from 'react-icons/io5';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdOutlinePhone } from "react-icons/md";
import { BiVideo } from "react-icons/bi";
import { GoSearch } from "react-icons/go";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { SlDislike } from "react-icons/sl";


const MessageGroupHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenSettings, setIsModalOpenSettings] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]);
  // const [project, setProject] = useState(location.state.Project);
  const {selectedUserGroup,AllUsers } = useSelector(store=>store.user)

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
    axios
      .put('/projects/add-user', {
        projectId: selectedUserGroup?._id,
        users: Array.from(selectedUserId),
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setIsModalOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // console.log("selectedUserGroup",selectedUserGroup)

  return (
    <div>
      <div className="flex items-center px-3 py-3 justify-between  bg-[#2b2b2b] cursor-pointer">
      <div className='flex items-center gap-4'>
      <div className="avatar">
        <div className="w-12 rounded-full">
              <img src={selectedUserGroup?.image || 'https://i.pinimg.com/originals/3b/14/04/3b1404dabe8a3897358832181616d23f.jpg'}/>
        </div>
      </div>
      <div>
        <h1 className="font-semibold">{selectedUserGroup?.name || 'GroupName' }</h1>
      </div>
      </div>
      <div className='' onClick={() => setIsModalOpenSettings(true)} >
        <HiOutlineDotsVertical />
      </div>
      </div>

      {isModalOpenSettings && (
        <div className=' right-0 fixed top-0 flex justify-between w-80 bg-amber-500  h-screen  bg-opacity-50  '>
          <div className='flex flex-col w-full gap-1'>
          <div className='flex flex-col items-center w-full bg-[#2b2b2b] p-3'>
          <div className='flex w-full justify-between'>
            <h1 onClick={()=> setIsModalOpenSettings(false)} >
            <IoIosArrowRoundBack />
            </h1>
            <h1 className='bg-red-300 rounded-full overflow-hidden  '>
              <img className='w-25 h-25 object-cover ' src={selectedUserGroup?.image || 'https://i.pinimg.com/originals/3b/14/04/3b1404dabe8a3897358832181616d23f.jpg'} alt="GroupPhoto" />
            </h1>
          <div onClick={()=> setIsModalOpenSettings(true)}>
          <HiOutlineDotsVertical />
          </div>
          </div>
          <div className='flex flex-col items-center'>
          <h1 className='text-2xl'>{selectedUserGroup?.name || 'GroupName' }</h1>
          <h4>Group - <span>8</span> members</h4>
          </div>
          <div className='flex gap-2'>
            <div className='border border-gray-500 p-2 px-3 text-green-400 rounded-lg flex flex-col justify-center items-center'>
            <MdOutlinePhone />
              <span className='text-white text-sm'>Audio</span>
              </div>
            <div className='border border-gray-500 p-2 px-4 text-green-400 rounded-lg flex flex-col justify-center items-center'>
            <BiVideo />
              <span className='text-white text-sm'> Video </span>
              </div>
            <div onClick={() => setIsModalOpen(true)} className='border border-gray-500 p-2 px-4 text-green-400 rounded-lg flex flex-col justify-center items-center'>
            <MdOutlinePersonAddAlt />
              <span className='text-white text-sm'> Add </span>
              </div>
            <div className='border border-gray-500 p-2 px-2 text-green-400 rounded-lg flex flex-col justify-center items-center'>
            <GoSearch />
              <span className='text-white text-sm'>Search</span>
              </div>
          </div>
          </div>  
          <div className='bg-[#2b2b2b] text-white px-5 p-3'>
            <h1 className=' text-green-300'>Add Group description</h1>
            <h4 className='text-sm text-gray-200'>Created by Kamlesh kumawat Bca, 11/5/24</h4>
          </div>
          <div className='bg-[#2b2b2b] text-white px-5 p-3'>
            <div className='flex items-center justify-between'>
              <h1>
              <span> 8 </span>
              members
              </h1>
              <div>
              <GoSearch />
              </div>
              </div>
            <div className='flex items-center gap-2'>
              <span className='text-black text-xl bg-green-400 rounded-full p-2'>
                <MdPersonAddAlt1 /> 
                </span>
              Add members
              </div>
            <div className='h-60 overflow-auto'>
              group members

            </div>
          </div>
         
          <div className='bg-[#2b2b2b] text-white px-5 p-3'>
            <div className='text-red-500'>Delete Group Member</div>
            <div className='text-red-500'> <RxExit />Exit group</div>
            <div className='text-red-500'> <SlDislike /> Report group</div>
          </div>
         

    
          </div>


        </div>
      )}

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center  bg-opacity-50'>
          <div className='bg-white p-6 rounded-md shadow-md w-full max-w-md'>
            <div className='flex justify-between'>
              <h2 className='text-xl mb-4 text-black font-semibold'>Users List</h2>
              <button className='p-2 text-sm hover:text-gray-800 text-black cursor-pointer' onClick={() => setIsModalOpen(false)}>
                <IoClose />
              </button>
            </div>
            <div className='flex flex-col gap-2 max-h-80 overflow-auto'>
              {AllUsers.map((user) => (
                <div
                  key={user.id}
                  className={`user flex gap-2 items-center p-2 border text-black border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer ${
                    Array.from(selectedUserId).indexOf(user._id) !== -1 ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => handleUserClick(user._id)}
                >
                  <div className='aspect-square relative rounded-full p-5 flex items-center justify-center text-white w-fit h-fit bg-blue-200'>
                    <i className='ri-user-fill absolute'></i>
                  </div>
                  <small className='text-[15px] font-semibold'>{user.email}</small>
                </div>
              ))}
            </div>
            <div className='flex justify-end mt-4'>
              <button onClick={addCollaborators} className='px-4 py-2 bg-gray-300 rounded-md cursor-pointer'>
                add 
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MessageGroupHeader
