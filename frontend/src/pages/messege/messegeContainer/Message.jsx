import React from 'react'

const Message = () => {
    const fromMe = false;
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  return (
    <div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src='https://cdn-icons-png.freepik.com/512/3135/3135715.png?ga=GA1.1.491426588.1717408448' />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} shake pb-2`}>Hello Brother!</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>1 min ago.</div>
		</div>
  )
}

export default Message