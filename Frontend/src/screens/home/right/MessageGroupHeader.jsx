import React from 'react'
import { useSelector } from 'react-redux'

const MessageGroupHeader = () => {
  const {selectedUserGroup} = useSelector(store=>store.user)

  // console.log("selectedUserGroup",selectedUserGroup)

  return (
    <div>
      <div className="flex items-center px-3 py-3 gap-4 bg-[#2b2b2b] cursor-pointer">
      <div className="avatar">
        <div className="w-12 rounded-full">
              <img src={selectedUserGroup?.image || 'https://i.pinimg.com/originals/3b/14/04/3b1404dabe8a3897358832181616d23f.jpg'}/>
        </div>
      </div>
      <div>
        <h1 className="font-semibold">{selectedUserGroup?.name || 'GroupName' }</h1>
      </div>
      </div>
    </div>
  )
}

export default MessageGroupHeader
