import React from 'react'
import {getRandomEmoji} from "../../../utils/emojis/emoji"
import useConversation from '../../../zustand/useConversation'

const Conversation = ({user}) => {

	const {selectedConversation, setSelectedConversation} = useConversation();

	const isSelected = selectedConversation?._id === user._id;

	const handleSelectedConversation = () => {
        console.log("Setting selected conversation:");
        setSelectedConversation(user);
    }
  return (
    <>
 			<div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-0.9 cursor-pointer ${isSelected ? "bg-sky-500" : ""}`}
				onClick={handleSelectedConversation}
			>
 				<div className='avatar online'>
 					<div className='w-12 rounded-full'>
						<img
 							src={user?.profileImg ||'/avatar-placeholder.png'}
 							alt={`${user.fullName}'s avatar`}
 						/>
 					</div>
 				</div>

 				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between' >
						<p className='font-bold text-gray-200'>{user?.fullName || username}</p>
 						<span className='text-xl'>{getRandomEmoji()}</span>
 					</div>
 				</div>
 			</div>

 			<div className='divider my-0 py-0 h-1' />
 		</>
  )
}

export default Conversation