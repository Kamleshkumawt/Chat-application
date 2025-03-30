import React from 'react'
import { useSelector } from 'react-redux'

const RightHeader = () => {
  const {selectedUser,onlineUsers} = useSelector(store=>store.user)

  const getOnlineUserStatus = (userId) => {
    // console.log('Online User Status', userId)
     return (onlineUsers || []).includes(userId);
  }
  
  return (
    <div>
      <div className="flex items-center px-3 py-3 gap-4 bg-[#2b2b2b] cursor-pointer">
      <div className={`avatar ${getOnlineUserStatus(selectedUser?._id) ? 'avatar-online' : ''}`}>
        <div className="w-12 rounded-full">
              <img src={selectedUser?.image || 'https://i.pinimg.com/originals/3b/14/04/3b1404dabe8a3897358832181616d23f.jpg'}/>
        </div>
      </div>
      <div>
        <h1 className="font-semibold">{selectedUser?.fullname || 'userName' }</h1>
        <span className='text-sm'>{getOnlineUserStatus(selectedUser?._id) ? 'Online' : 'Offline'}</span>
      </div>
      </div>
    </div>
  )
}

export default RightHeader
