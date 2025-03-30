import React from 'react'
import Left from './left/Left'
import Right from './right/Right'

const Home = () => {
  return (
    <div className='flex h-screen w-full'>
      <Left/>
      <Right/>
    </div>
  )
}

export default Home
