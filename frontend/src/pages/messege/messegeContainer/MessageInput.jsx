import React from 'react'
import { IoSend } from "react-icons/io5";

const MessageInput = () => {
  return (
    <form className='px-4 my-3 '>
 			<div className='w-full '>
 				<input
 					type='text'
 					className='border  text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
 					placeholder='Send a message'
 				/>
 				<button type='submit' className=' absolute  end-10 bottom-10  flex items-center pe-3'>
 					<IoSend  className='w-6 h-6 mt-2  text-white cursor-pointer' />
 				</button>
 			</div>
 		</form>
  )
}

export default MessageInput