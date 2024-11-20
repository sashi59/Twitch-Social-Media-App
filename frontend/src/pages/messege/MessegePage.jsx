import React from 'react'
import SideChats from './sideChat/SideChats'
import MessegeContainer from './messegeContainer/MessegeContainer'

const MessegePage = () => {

    
  return (
    
    <div className='flex border  text-sm   w-full p-2.5  bg-gray-700 border-gray-600 sm:h-[750px]   md-h-[850px]  overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0  scrollbar-hidden'>
        <SideChats className="flex-2"/>
        <MessegeContainer className="flex-3"/>
    </div>
  )
}

export default MessegePage