import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messeges, setMesseges, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			if (!selectedConversation?._id) return; // Early exit if no ID
			setLoading(true);
			try {
				const res = await fetch(`/api/messege/${selectedConversation._id}`);
				const data = await res.json();
				console.log("data: " + data);
				
				if (data.error) throw new Error(data.error);
				setMesseges(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) {
			console.log("Selected Conversation ID: ", selectedConversation._id);
			getMessages();
		  }
	}, [selectedConversation?._id, setMesseges]);

	return { messeges, loading };
};
export default useGetMessages;