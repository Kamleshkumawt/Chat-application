import React from 'react'
import { CiSearch } from "react-icons/ci";
import { setSearchQuery } from "../../../../redux/userSlice";
import { useDispatch } from "react-redux";

const Iosearch = () => {
    const dispatch = useDispatch();

    const searchHandler = (e) => {
      dispatch(setSearchQuery(e.target.value)); // Redux action to update search user state
    };
  return (
      <div
          className="w-full flex hover:border-b border-b  active:border-green-400 bg-[#404040] text-[#f4f4f4] items-center rounded pl-2"
        >
          <CiSearch className="rotate-90" />
          <input
            type="text"
            onChange={searchHandler}
            className="w-full p-1 outline-none"
            placeholder="Search or start a new chat..."
          />
        </div>
  )
}

export default Iosearch
