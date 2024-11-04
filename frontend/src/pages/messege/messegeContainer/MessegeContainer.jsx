import React from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'

const MessegeContainer = () => {
  return (
    <div className='w-full flex flex-col p-2'>
 			<>
 				{/* Header */}
 				<div className='bg-sky-500 px-4 py-2 mb-2'>
 					<span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>John doe</span>
 				</div>

 				<Messages />
 				<MessageInput />
 			</>
 		</div>
  )
}

export default MessegeContainer