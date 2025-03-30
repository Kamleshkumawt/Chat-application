import React, { useState } from "react";
import { MdGroupAdd } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import axios from "../../../../config/axios";

const GroupChat = ({ setIsModalOpen }) => {
  const [isModalOpen, setIsModalOpenAdd] = useState(false);
  const [projectName, setProjectName] = useState("");

  function createProject(e) {
    e.preventDefault();

    axios
      .post("/projects/create", {
        name: projectName,
      },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(( ) => {
        // console.log("Project Created:",);
        setIsModalOpen(false);
        alert("Group created successfully");
      })
      .catch((err) => {
        console.error("Failed to create project:", err.message);

        // Handle error onClick={() => setIsModalOpen(true)}
      });
  }

  return (
    <div>
      <div className="flex flex-col items-center px-5 py-4 bg-[#2b2b2b] gap-2">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl font-semibold text-white ">Groups</h1>
          <div className="flex gap-5 text-white text-lg">
            <button onClick={() => setIsModalOpenAdd(true)} className="cursor-pointer hover:scale-3d" >
              <MdGroupAdd />
            </button>
            <div>
              <h1 onClick={() => setIsModalOpen(false)} className="cursor-pointer hover:text-red-400" >
                <IoClose />
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full flex hover:border-b border-b  active:border-green-400 bg-[#404040] text-[#f4f4f4] items-center rounded pl-2">
          <CiSearch className="rotate-90" />
          <input
            type="text"
            className="w-full p-1 outline-none"
            placeholder="Search or start a new chat..."
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center ml-14 z-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl mb-4 text-black">Create New Group</h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Group Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 bg-red-300 hover:bg-red-600 rounded-md hover:cursor-pointer"
                  onClick={() => setIsModalOpenAdd(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white rounded-md"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
};


export default GroupChat;