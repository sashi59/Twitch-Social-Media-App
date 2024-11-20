
import { useQuery } from "@tanstack/react-query";
import useConversation from "../../../zustand/useConversation";
import { formatMessageTime } from "../../../utils/emojis/extractTime";



const Message = ({ messege }) => {
	const {data: authUser} = useQuery({queryKey : ["authUser"]})
	const { selectedConversation } = useConversation();
	const fromMe = messege?.senderId === authUser?._id;
	const formattedTime = formatMessageTime(messege.createdAt);

	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profileImg : selectedConversation?.profileImg;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const shakeClass = messege.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{messege.messege}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default Message;