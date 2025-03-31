import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MdOutlineDeleteOutline, MdPersonAddAlt1 } from "react-icons/md";
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
  const [isModalOpenSettingsInfo, setIsModalOpenSettingsInfo] = useState(false);
  const [isModalOpenChangeInfo, setIsModalOpenChangeInfo] = useState(false);
  const [isModalOpenChangeInfoD, setIsModalOpenChangeInfoD] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]);
  // const [project, setProject] = useState(location.state.Project);
  const {selectedUserGroup,AllUsers } = useSelector(store=>store.user)
  const [projectDetails, setProjectDetails] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [letterCount, setLetterCount] = useState(0);

  const handleChange = (event) => {
    const value = event.target.value;
    const maxLength = 30;
    if (event.target.value.length <= maxLength) {
      setInputValue(value);
      // setInputValue(event.target.value);
    }
    setLetterCount(value.length);
  };
  const handleChangeD = (event) => {
    const value = event.target.value;
    const maxLength = 30;
    if (event.target.value.length <= maxLength) {
      setInputValue(value);
      // setInputValue(event.target.value);
    }
    setLetterCount(value.length);
  };

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
        console.log(res.data.project);
        setIsModalOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

useEffect(() => {
  function getProjectDetails(project) {
    axios
     .get(`/projects/get-project/${project?._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
     .then((res) => {
        setProjectDetails(res.data.project.users)
        console.log(res.data.project);
      })
     .catch((err) => {
        console.log(err);
      });
  }

  if(selectedUserGroup) {
    getProjectDetails(selectedUserGroup)
  }
},[selectedUserGroup]);
  // console.log("selectedUserGroup",selectedUserGroup)
  console.log(projectDetails);

const deleteProjectMember = (projectMember) => {
    axios
     .delete(`/projects/delete-user/${projectMember._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
     .then((res) => {
        console.log(res.data.project);
        setIsModalOpenSettingsInfo(true);
      })
     .catch((err) => {
        console.log(err);
      });
  }

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
        <div className=' right-0 fixed top-0 flex justify-between w-85 bg-[#151515]  h-screen  bg-opacity-50  '>
          <div className='flex flex-col w-full gap-1'>
          <div className='flex flex-col items-center w-full gap-3 bg-[#2b2b2b] p-3'>
          <div className='flex w-full justify-between'>
            <h1 className='text-xl cursor-pointer' onClick={()=> setIsModalOpenSettings(false)} >
            <IoIosArrowRoundBack />
            </h1>
            <h1 className=' rounded-full overflow-hidden  '>
              <img className='w-25 h-25 object-cover ' src={selectedUserGroup?.image || 'https://i.pinimg.com/originals/3b/14/04/3b1404dabe8a3897358832181616d23f.jpg'} alt="GroupPhoto" />
            </h1>
          <div className='cursor-pointer' onClick={()=> setIsModalOpenSettingsInfo(!isModalOpenSettingsInfo)}>
          <HiOutlineDotsVertical />
          </div>
          </div>
          <div className='flex flex-col items-center'>
          <h1 className='text-2xl'>{selectedUserGroup?.name || 'GroupName' }</h1>
          <h4>Group - <span>{projectDetails?.length}</span> members</h4>
          </div>
          <div className='flex gap-2'>
            <div className='border border-gray-500 p-2 px-3 text-green-400 rounded-lg flex flex-col justify-center items-center cursor-pointer'>
            <MdOutlinePhone />
              <span className='text-white text-sm'>Audio</span>
              </div>
            <div className='border border-gray-500 p-2 px-4 text-green-400 rounded-lg flex flex-col justify-center items-center cursor-pointer'>
            <BiVideo />
              <span className='text-white text-sm'> Video </span>
              </div>
            <div onClick={() => setIsModalOpen(true)} className='border border-gray-500 p-2 px-4 text-green-400 rounded-lg flex flex-col justify-center items-center cursor-pointer'>
            <MdOutlinePersonAddAlt />
              <span className='text-white text-sm'> Add </span>
              </div>
            <div className='border border-gray-500 p-2 px-2 text-green-400 rounded-lg flex flex-col justify-center items-center cursor-pointer'>
            <GoSearch />
              <span className='text-white text-sm'>Search</span>
              </div>
          </div>
          </div>  
          <div className='bg-[#2b2b2b] text-white px-5 p-3 '>
            <h1 onClick={() => setIsModalOpenChangeInfoD(true)} className=' text-green-300 cursor-pointer'>Add Group description</h1>
            <h4 className='text-sm text-gray-200'>Created by Kamlesh kumawat Bca, 11/5/24</h4>
          </div>
          <div className='bg-[#2b2b2b] text-white px-5 p-3'>
            <div className='flex items-center justify-between'>
              <h1>
              <span> {projectDetails?.length} </span>
              members
              </h1>
              <div className='cursor-pointer'>
              <GoSearch />
              </div>
              </div>
            <div className='flex items-center gap-2 p-2 cursor-pointer' onClick={()=>setIsModalOpen(true)}>
              <span className='text-black text-xl bg-green-400 rounded-full p-2'>
                <MdPersonAddAlt1 /> 
                </span>
              Add members
              </div>
            <div className='h-50 overflow-auto'>
              {projectDetails.map((project) =>{
                return (
                  <div key={project._id} className='flex gap-2 items-center p-2 cursor-pointer'>
                     <div className='flex items-center gap-1'>
                      <div className='avatar'>
                        <div className='w-10 rounded-full'>
                          <img src={project?.image || 'https://i.pinimg.com/originals/3b/14/04/3b1404dabe8a3897358832181616d23f.jpg'}/>
                        </div>
                      </div>
                      <div>
                        <h3 className='text-white text-sm'>{project.fullname || 'UserName'}</h3>
                        <h4 className='text-gray-300 text-xs'>{project.email || 'UserEmail'}</h4>
                      </div>
                      </div>
                  </div>)
              })}

            </div>
          </div>
         
          <div className='bg-[#2b2b2b] text-white px-5 p-2 flex flex-col gap-2'>
            <div onClick={()=> deleteProjectMember(projectDetails._id)} className='text-red-500 flex items-center gap-3 cursor-pointer text-[17px] '> <MdOutlineDeleteOutline /> Delete Group Member</div>
            <div className='text-red-500 flex items-center gap-3 cursor-pointer text-[17px] '> <RxExit />Exit group</div>
            <div className='text-red-500 flex items-center gap-3 cursor-pointer text-[17px] '> <SlDislike /> Report group</div>
          </div>
         

    
          </div>


        </div>
      )}

      {isModalOpenSettingsInfo && (
        <div onClick={()=> setIsModalOpenSettingsInfo(false)} className='right-0 top-10 fixed flex justify-between w-43 rounded-lg h-20 bg-[#2b2b2b] p-3 bg-opacity-50'>
          <div className='flex flex-col'>
        <span className='cursor-pointer' onClick={()=> setIsModalOpen(true)}>Add members</span>
        <span className='cursor-pointer' onClick={()=> setIsModalOpenChangeInfo(true)}>Change group name</span>
        </div>
        </div>
      )}

      { isModalOpenChangeInfo && (
        <div className='fixed  inset-0 flex items-center justify-center  bg-opacity-50'>
        <div className='fixed  flex rounded-lg bg-[#2b2b2b] w-80  bg-opacity-50'>
        <div className='flex flex-col gap-5 w-full'>
        <div className='p-3 text-lg'>Enter Group Name</div>
        <div className='flex items-center '>
        <div className='border-2 m-2 border-green-600 min-w-66 p-2 rounded-lg text-white'> 
          <input className='w-full outline-none '
          onChange={handleChange}
          value={inputValue}
          placeholder='Enter the text . . . .' type="text" />
        </div>
        <div>{letterCount}</div>
        </div>
        <div className='border-t mt-40 border-gray-400 text-green-500 flex items-center justify-evenly'>
          <div onClick={()=> setIsModalOpenChangeInfo(false)} > Cancel</div>
          <div className='border-l border-l-gray-400 h-10'></div>
          <div> OK</div>
        </div>
        </div>
        </div>
        </div>
      )}

      { isModalOpenChangeInfoD && (
        <div className='fixed  inset-0 flex items-center justify-center  bg-opacity-50'>
        <div className='fixed  flex rounded-lg bg-[#2b2b2b] w-80  bg-opacity-50'>
        <div className='flex flex-col gap-5 w-full'>
        <div className='p-3 text-lg'>Group Description</div>
        <div className='flex items-center '>
        <div className='border-2 m-2 border-green-600 min-w-66 p-2 rounded-lg text-white'> 
          <input className='w-full outline-none '
          onChange={handleChangeD}
          value={inputValue}
          placeholder='Add group description . . . .' type="text" />
        </div>
        <div>{letterCount}</div>
        </div>
        <p className='text-sm -mt-4 p-2'>The group description is visible to members of this group and people invited to this group.</p>
        <div className='border-t mt-40 border-gray-400 text-green-500 flex items-center justify-evenly'>
          <div onClick={()=> setIsModalOpenChangeInfoD(false)} > Cancel</div>
          <div className='border-l border-l-gray-400 h-10'></div>
          <div> OK</div>
        </div>
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
                  <div className='relative rounded-full p-5 flex items-center justify-center text-white w-fit h-fit bg-blue-200 overflow-hidden'>
                    {/* <i className='ri-user-fill absolute'></i> */}
                    <img className='absolute' src={user.image || 'https://i.pinimg.com/originals/3b/14/04/3b1404dabe8a3897358832181616d23f.jpg'}/>
                  </div>
                  <small className='text-[15px] font-semibold'>{user.email}</small>
                </div>
              ))}
            </div>
            <div className='flex justify-end mt-4'>
              <button onClick={addCollaborators} className='px-4 py-2 bg-gray-400 rounded-md cursor-pointer'>
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
