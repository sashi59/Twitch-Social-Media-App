import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

export const useSendMessege = () => {
	const [loading, setLoading] = useState(false);
	const { messeges, setMesseges, selectedConversation } = useConversation();

	const sendMessege = async (messege) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/messege/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ messege }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setMesseges([...messeges, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessege, loading };
};
