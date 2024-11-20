import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import { useSendMessege } from '../../../hooks/useSendMessege';

const MessageInput = () => {
	const [messege, setMessege] = useState("");
	const {sendMessege, loading} = useSendMessege();
	const handelSubmit = async (e) => {
		e.preventDefault();
		console.log("Message to send:", messege); // Debugging statement
		if (!messege.trim()) {
			toast.error("Messege cannot be empty");
			return;
		}
		await sendMessege(messege);
		setMessege("");
	};
	
	
  return (
    <form className='px-4 my-3 flex' onSubmit={handelSubmit}>
 			<div className='w-full '>
 				<input
 					type='text'
 					className='border  text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
 					placeholder='Send a message'
					value={messege}
					onChange={(e)=>setMessege(e.target.value)}
					
 				/>
 				<button type='submit' className=' absolute  end-10 bottom-10  flex items-center pe-3'>
 					{loading ? <div className='loading loading-spinner'></div> : <IoSend className='w-6 h-6 mt-2  text-white cursor-pointer' />}
 				</button>
 			</div>
 		</form>
  )
}

export default MessageInput