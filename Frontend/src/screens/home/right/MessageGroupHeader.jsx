import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDeleteOutline, MdPersonAddAlt1 } from "react-icons/md";
import axios from "../../../config/axios";
import { IoClose } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosArrowRoundBack, IoMdShareAlt } from "react-icons/io";
import { RiVoiceprintFill } from "react-icons/ri";
import { GoChevronUp, GoSearch } from "react-icons/go";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { SlDislike } from "react-icons/sl";
import { ToastContainer, toast } from "react-toastify";
import { CiSearch } from "react-icons/ci";
import { GoChevronDown } from "react-icons/go";
import { setSearchChatQuery } from "../../../redux/userSlice";


const MessageGroupHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenSettings, setIsModalOpenSettings] = useState(false);
  const [isModalOpenSettingsInfo, setIsModalOpenSettingsInfo] = useState(false);
  const [isModalOpenChangeInfo, setIsModalOpenChangeInfo] = useState(false);
  const [isModalOpenChangeInfoD, setIsModalOpenChangeInfoD] = useState(false);
  const [isModalOpenChange, setIsModalOpenChange] = useState(false);
  const [isModalOpenReport, setIsModalOpenReport] = useState(false);
  const [isModalOpenSearch, setIsModalOpenSearch] = useState(false);
  const [isModalOpenSearchUser, setIsModalOpenSearchUser] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  // const [project, setProject] = useState(location.state.Project);
  const { selectedUserGroup, AllUsers} = useSelector((store) => store.user);
  const [projectDetails, setProjectDetails] = useState([]);
  const [projectInAdd, setProjectInAdd] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputValueD, setInputValueD] = useState("");
  const [letterCount, setLetterCount] = useState(0);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const searchHandler = (e) => {
    dispatch(setSearchChatQuery(e.target.value)); // Redux action to update search user state
    // console.log(e.target.value);
  };
  const searchHandlerUser = (e) => {
    setSearchQuery(e.target.value); 
  }
  const filteredUsers = projectDetails.filter((user) =>
    user.fullname?.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );

  // console.log("projectDetails", projectDetails);
  // console.log("AllUsers", AllUsers);

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
    const maxLength = 50;
    if (event.target.value.length <= maxLength) {
      setInputValueD(value);
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

  const handleUserClicks = (id) => {
    setSelectedUserIds((prevSelectedUserId) => {
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
      .put(
        "/projects/add-user",
        {
          projectId: selectedUserGroup?._id,
          users: Array.from(selectedUserId),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.project);
        toast.success("Members are added successfully!");
        setIsModalOpen(false);
        // toast.success('Login Successful!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteCollaborators() {
    console.log("projectDetails", selectedUserGroup._id);
    console.log("selected", selectedUserIds);

    axios
      .delete(
        "/projects/delete-user",
        {
          projectId: selectedUserGroup._id,
          users: Array.from(selectedUserIds),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.project);
        toast.success("Members are deleted successfully!");
        setIsModalOpen(false);
        // toast.success('Login Successful!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function sendReport(){
    // alert("Please");
    toast.success("Report send Successful!");
    setIsModalOpenReport(false);
  }

  useEffect(() => {
    // Extracting projectDetails IDs
    const projectDetailsIds = projectDetails.map((user) => user._id);

    // Finding users not in projectDetails
    const usersNotInProject = AllUsers.filter(
      (user) => !projectDetailsIds.includes(user._id)
    );
    setProjectInAdd(usersNotInProject);

    // Displaying the result
    // console.log('usersNotInProject',usersNotInProject);
  }, [projectDetails, AllUsers]);

  function exitGroup(selectedGroup) {
    axios
      .delete(`/projects/delete-project/${selectedGroup}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        // console.log(res.data.project);
        toast.success("You have left the group successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: 'Check out this awesome page!',
        url: window.location.href,
      })
    } else {
      alert('Share functionality is not supported in this browser.');
    }
  };

  // console.log('ProjectInAdd',projectInAdd);

  useEffect(() => {
    // console.log('updated are group')
  }, [selectedUserGroup]);

  useEffect(() => {
    function getProjectDetails(project) {
      axios
        .get(`/projects/get-project/${project?._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setProjectDetails(res.data.project.users);
          // console.log(res.data.project);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (selectedUserGroup) {
      getProjectDetails(selectedUserGroup);
    }
  }, [selectedUserGroup]);

  // console.log("selectedUserGroup",selectedUserGroup)
  // console.log(projectDetails);

  return (
    <div>
      <div className="flex items-center px-3 py-3 justify-between  bg-[#2b2b2b] cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img
                src={
                  selectedUserGroup?.image ||
                  "https://i.pinimg.com/originals/3b/14/04/3b1404dabe8a3897358832181616d23f.jpg"
                }
              />
            </div>
          </div>
          <div>
            <h1 className="font-semibold">
              {selectedUserGroup?.name || "GroupName"}
            </h1>
          </div>
        </div>
        <div className="" onClick={() => setIsModalOpenSettings(true)}>
          <HiOutlineDotsVertical />
        </div>
      </div>

      {isModalOpenSettings && (
        <div className=" right-0 fixed top-0 flex justify-between w-85 bg-[#151515]  h-screen  bg-opacity-50  ">
          <div className="flex flex-col w-full gap-1">
            <div className="flex flex-col items-center w-full gap-3 bg-[#2b2b2b] p-3">
              <div className="flex w-full justify-between">
                <h1
                  className="text-xl cursor-pointer"
                  onClick={() => setIsModalOpenSettings(false)}
                >
                  <IoIosArrowRoundBack />
                </h1>
                <h1 className=" rounded-full overflow-hidden  ">
                  <img
                    className="w-25 h-25 object-cover "
                    src={
                      selectedUserGroup?.image ||
                      "https://i.pinimg.com/originals/3b/14/04/3b1404dabe8a3897358832181616d23f.jpg"
                    }
                    alt="GroupPhoto"
                  />
                </h1>
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    setIsModalOpenSettingsInfo(!isModalOpenSettingsInfo)
                  }
                >
                  <HiOutlineDotsVertical />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-2xl">
                  {selectedUserGroup?.name || "GroupName"}
                </h1>
                <h4>
                  Group - <span>{projectDetails?.length}</span> members
                </h4>
              </div>
              <div className="flex gap-2">
                <div
                  onClick={() => setIsModalOpen(true)}
                  className="border border-gray-500 p-2 px-4 text-green-400 rounded-lg flex flex-col justify-center items-center cursor-pointer"
                >
                  <MdOutlinePersonAddAlt />
                  <span className="text-white text-sm"> Add </span>
                </div>
                <div className="border border-gray-500 p-2 px-4 text-green-400 rounded-lg flex flex-col justify-center items-center cursor-pointer">
                  <RiVoiceprintFill />
                  <span className="text-white text-sm"> Voice Chat </span>
                </div>
                <div onClick={()=> {
                  setIsModalOpenSearch(true),
                  setIsModalOpenSettings(false)
                }} className="border border-gray-500 p-2 px-2 text-green-400 rounded-lg flex flex-col justify-center items-center cursor-pointer">
                  <GoSearch />
                  <span className="text-white text-sm">Search</span>
                </div>
                <div onClick={handleShare} className="border border-gray-500 p-2 px-3 text-green-400 rounded-lg flex flex-col justify-center items-center cursor-pointer">
                  <IoMdShareAlt />
                  <span className="text-white text-sm">Share</span>
                </div>
              </div>
            </div>
            <div className="bg-[#2b2b2b] text-white px-5 p-3 ">
              <h1
                onClick={() => setIsModalOpenChangeInfoD(true)}
                className=" text-green-300 cursor-pointer"
              >
                Add Group description
              </h1>
              <h5>{inputValueD}</h5>
              <h4 className="text-sm text-gray-200">
                Created by Kamlesh kumawat Bca, 11/5/24
              </h4>
            </div>
            <div className="bg-[#2b2b2b] text-white px-5 p-3">
              <div className="flex items-center justify-between">
                <h1>
                  <span> {projectDetails?.length} </span>
                  members
                </h1>
                <div className="cursor-pointer" onClick={()=> setIsModalOpenSearchUser(true)} >
                  <GoSearch />
                </div>
              </div>
              <div
                className="flex items-center gap-2 p-2 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <span className="text-black text-xl bg-green-400 rounded-full p-2">
                  <MdPersonAddAlt1 />
                </span>
                Add members
              </div>
              <div className="h-50 overflow-auto">
                {filteredUsers.map((project) => {
                  return (
                    <div
                      key={project._id}
                      className="flex gap-2 items-center p-2 cursor-pointer"
                    >
                      <div className="flex items-center gap-1">
                        <div className="avatar">
                          <div className="w-10 rounded-full">
                            <img
                              src={
                                project?.image ||
                                "https://i.pinimg.com/originals/3b/14/04/3b1404dabe8a3897358832181616d23f.jpg"
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-white text-sm">
                            {project.fullname || "UserName"}
                          </h3>
                          <h4 className="text-gray-300 text-xs">
                            {project.email || "UserEmail"}
                          </h4>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#2b2b2b] text-white px-5 p-2 flex flex-col gap-2">
              <div
                onClick={() => setIsModalOpenChange(true)}
                className="text-red-500 flex items-center gap-3 cursor-pointer text-[17px] "
              >
                <MdOutlineDeleteOutline /> Delete Group Member
              </div>
              <div
                onClick={() => exitGroup(selectedUserGroup?._id)}
                className="text-red-500 flex items-center gap-3 cursor-pointer text-[17px] "
              >
                <RxExit />
                Exit group
              </div>
              <div
                onClick={() => setIsModalOpenReport(true)}
                className="text-red-500 flex items-center gap-3 cursor-pointer text-[17px] "
              >
                <SlDislike /> Report group
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpenSearchUser && (
        <div className="fixed flex top-85 right-1 ">
        <div className="flex bg-[#2c2c31] w-80">
        <div className="w-full flex hover:border-b border-b  active:border-green-400 bg-[#2c2c31] text-[#f4f4f4] items-center rounded pl-2">
          <CiSearch className="rotate-90 cursor-pointer" />
          <input
            type="text"
            onChange={searchHandlerUser}
            className="w-full p-1 outline-none cursor-pointer"
            placeholder="Search whitIn chat..."
            />
        </div> 
        <div className="hover:text-red-400 cursor-pointer p-2" onClick={()=> setIsModalOpenSearchUser(false)}
         >
          <IoClose/>         
         </div>
        </div>
        </div>
      )}

      {isModalOpenSearch && (
        <div className="fixed flex right-1   bg-opacity-50">
          <div className="flex items-center gap-5">
         <div className="w-full flex hover:border-b border-b  active:border-green-400 bg-[#2c2c31] text-[#f4f4f4] items-center rounded pl-2">
          <CiSearch className="rotate-90 cursor-pointer" />
          <input
            type="text"
            onChange={searchHandler}
            className="w-full p-1 outline-none cursor-pointer"
            placeholder="Search whitIn chat..."
          />
        </div> 
        <div className="flex gap-5">
        <GoChevronUp className="cursor-pointer " />
        <GoChevronDown className="cursor-pointer" />

        </div>
        <div className="hover:text-red-400 cursor-pointer p-2" onClick={()=> setIsModalOpenSearch(false)}
         >
          <IoClose/>         
         </div>
          </div>
        </div>
      )}


      {isModalOpenSettingsInfo && (
        <div
          onClick={() => setIsModalOpenSettingsInfo(false)}
          className="right-0 top-10 fixed flex justify-between w-43 rounded-lg h-20 bg-[#2b2b2b] p-3 bg-opacity-50"
        >
          <div className="flex flex-col">
            <span
              className="cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              Add members
            </span>
            <span
              className="cursor-pointer"
              onClick={() => setIsModalOpenChangeInfo(true)}
            >
              Change group name
            </span>
          </div>
        </div>
      )}

      {isModalOpenChangeInfo && (
        <div className="fixed  inset-0 flex items-center justify-center  bg-opacity-50">
          <div className="fixed  flex rounded-lg bg-[#2b2b2b] w-80  bg-opacity-50">
            <div className="flex flex-col gap-5 w-full">
              <div className="p-3 text-lg">Enter Group Name</div>
              <div className="flex items-center ">
                <div className="border-2 m-2 border-green-600 min-w-66 p-2 rounded-lg text-white">
                  <input
                    className="w-full outline-none "
                    onChange={handleChange}
                    value={inputValue}
                    placeholder="Enter the text . . . ."
                    type="text"
                  />
                </div>
                <div>{letterCount}</div>
              </div>
              <div className="border-t mt-40 border-gray-400 text-green-500 flex items-center justify-evenly">
                <div
                  className="cursor-pointer"
                  onClick={() => setIsModalOpenChangeInfo(false)}
                >
                  {" "}
                  Cancel
                </div>
                <div className="border-l border-l-gray-400 h-10"></div>
                <div className="cursor-pointer"> OK</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpenChangeInfoD && (
        <div className="fixed  inset-0 flex items-center justify-center  bg-opacity-50">
          <div className="fixed  flex rounded-lg bg-[#2b2b2b] w-80  bg-opacity-50">
            <div className="flex flex-col gap-5 w-full">
              <div className="p-3 text-lg">Group Description</div>
              <div className="flex items-center ">
                <div className="border-2 m-2 border-green-600 min-w-66 p-2 rounded-lg text-white">
                  <input
                    className="w-full outline-none "
                    onChange={handleChangeD}
                    value={inputValueD}
                    placeholder="Add group description . . . ."
                    type="text"
                  />
                </div>
                <div>{letterCount}</div>
              </div>
              <p className="text-sm -mt-4 p-2">
                The group description is visible to members of this group and
                people invited to this group.
              </p>
              <div className="border-t mt-40 border-gray-400 text-green-500 flex items-center justify-evenly">
                <div
                  onClick={() => setIsModalOpenChangeInfoD(false)}
                  className="cursor-pointer"
                >
                  {" "}
                  Cancel
                </div>
                <div className="border-l border-l-gray-400 h-10"></div>
                <div className="cursor-pointer"> OK</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpenChange && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
            <div className="flex justify-between">
              <h2 className="text-xl mb-4 text-black font-semibold">
                Users List
              </h2>
              <button
                className="p-2 text-sm hover:text-gray-800 text-black cursor-pointer"
                onClick={() => setIsModalOpenChange(false)}
              >
                <IoClose />
              </button>
            </div>
            <div className="flex flex-col gap-2 max-h-80 overflow-auto text-black">
              {projectInAdd.length > 0
                ? ""
                : "All Members Are Deleted in Group"}
              {projectDetails.map((user) => (
                <div
                  key={user.id}
                  className={`user flex gap-2 items-center p-2 border text-black border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer ${
                    Array.from(selectedUserIds).indexOf(user._id) !== -1
                      ? "bg-gray-200"
                      : ""
                  }`}
                  onClick={() => handleUserClicks(user._id)}
                >
                  <div className="relative rounded-full p-5 flex items-center justify-center text-white w-fit h-fit bg-blue-200 overflow-hidden">
                    {/* <i className='ri-user-fill absolute'></i> */}
                    <img
                      className="absolute"
                      src={
                        user.image ||
                        "https://i.pinimg.com/originals/3b/14/04/3b1404dabe8a3897358832181616d23f.jpg"
                      }
                    />
                  </div>
                  <small className="text-[15px] font-semibold">
                    {user.email}
                  </small>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => deleteCollaborators()}
                className="px-4 py-2 bg-gray-400 hover:bg-red-600 rounded-md cursor-pointer"
              >
                delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpenReport && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
          <div className=" rounded-lg bg-[#2b2b2b] px-6 gap-2 py-8 flex flex-col text-[#f4f4f4e0] max-w-96 ">
            <h1 className="text-2xl text-center ">
              {" "}
              Report this group to WhatsApp?
            </h1>
            <p className="p-5">
              The last 5 messages from this group will be forwarded to WhatsApp.
              If you exit this group and delete the chat, messages will only be
              removed from this device and your devices on the newer versions of
              WhatsApp.
            </p>
            <p>No one in this group will be notified.</p>
            <div className="flex gap-4 items-center">
              {/* <input type="checkbox" /> */}
              <input type="checkbox" className="w-4 h-5 rounded-md  cursor-pointer hover:scale-105 peer" />
              <p>Exit group and delete chat</p>
            </div>

            <div className="text-green-400 flex justify-end mr-10 mt-5 gap-12">
              <div className="cursor-pointer" onClick={() => setIsModalOpenReport(false)}>Cancel</div>
              <div onClick={()=> sendReport()} className="cursor-pointer hover:text-red-500 " >Report</div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
            <div className="flex justify-between">
              <h2 className="text-xl mb-4 text-black font-semibold">
                Users List
              </h2>
              <button
                className="p-2 text-sm hover:text-gray-800 text-black cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              >
                <IoClose />
              </button>
            </div>
            <div className="flex flex-col gap-2 max-h-80 overflow-auto text-black">
              {projectInAdd.length > 0 ? "" : "All Members Are Added in Group"}
              {projectInAdd.map((user) => (
                <div
                  key={user.id}
                  className={`user flex gap-2 items-center p-2 border text-black border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer ${
                    Array.from(selectedUserId).indexOf(user._id) !== -1
                      ? "bg-gray-200"
                      : ""
                  }`}
                  onClick={() => handleUserClick(user._id)}
                >
                  <div className="relative rounded-full p-5 flex items-center justify-center text-white w-fit h-fit bg-blue-200 overflow-hidden">
                    {/* <i className='ri-user-fill absolute'></i> */}
                    <img
                      className="absolute"
                      src={
                        user.image ||
                        "https://i.pinimg.com/originals/3b/14/04/3b1404dabe8a3897358832181616d23f.jpg"
                      }
                    />
                  </div>
                  <small className="text-[15px] font-semibold">
                    {user.email}
                  </small>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={addCollaborators}
                className="px-4 py-2 bg-gray-400 rounded-md cursor-pointer"
              >
                add
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default MessageGroupHeader;
