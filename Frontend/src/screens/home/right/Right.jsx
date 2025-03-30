import React from 'react'
import RightHeader from './RightHeader'
import Message from './Message'

//bg-[#151515]
const Right = () => {
  return (
    <div className='b-slate-600 bg-[#151515] w-[75%]'> 
      <RightHeader/>
      <Message/>
    </div>
  )
}

export default Right
