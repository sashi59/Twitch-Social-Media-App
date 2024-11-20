import React, { useState, useRef, useEffect } from "react";
import Message from "./Message";
import { useQuery } from "@tanstack/react-query";
// import useConversation from "../../../zustand/useConversation";
import useGetMessages from "../../../hooks/useGetMessege";
import ChatSkeleton from "../../../components/skeletons/ChatSkeleton";

const Messages = () => {
	const { messeges, loading } = useGetMessages();
	console.log("messages: ", messeges)
	// useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messeges]);

	return (
		<div className='px-4 flex-1 overflow-y-scroll no-scrollbar '>
			{!loading && messeges.length > 0 &&
				
				messeges?.map((messege) => (
					<div key={messege._id} ref={lastMessageRef}>
						<Message messege={messege} />
					</div>
				))}
			

			{loading && [...Array(3)].map((_, idx) => <ChatSkeleton key={idx} />)}
			{!loading && messeges.length === 0 &&  (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
		</div>
	);
};


// const Messages = () => {
//   const [messege, setMessege] = useState("");
//   const { selectedConversation, setSelectedConversation } = useConversation();

//   const { data: chatMessege, isLoading } = useQuery({
//     queryKey: ["chatMessege"],
//     queryFn: async () => {
//       try {
//         const res = await fetch(`/api/messege/${selectedConversation._id}`);
//         const data = await res.json();

//         if (!res.ok) throw new Error(data.error || "Something went wrong");
//         return data;
//       } catch (error) {
//         throw new Error(error);
//       }
//     },
//   });
//   if (chatMessege?.length === 0) return <div className="md:w-64 w-0"></div>;

//   return (
//     <div className="px-4 flex-1 overflow-auto ">
//       {isLoading && (
//         <>
//           Loading...
//         </>
//       )}
//       {!isLoading &&
	  
//         chatMessege?.map((mes) => <Message key={mes._id} mes={mes} />)}
//     </div>
//   );
// };

export default Messages;
