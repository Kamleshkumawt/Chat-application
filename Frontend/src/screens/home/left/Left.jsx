import React from 'react'
import Header from './leftheader/Header'
import Users from "./leftheader/Users";

const Left = () => {
  return (
    <div className='bg-[#151515] w-[25%]'>
        <Header/>
        <div className='p-1 overflow-auto h-[85vh]'>
        <Users/>
        </div>
    </div>
  )
}

export default Left
