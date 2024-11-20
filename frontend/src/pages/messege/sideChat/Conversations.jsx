import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Conversation from "./Conversation";
import ChatSkeleton from "../../../components/skeletons/ChatSkeleton";

const Conversations = () => {
  const { data: chatUsers, isLoading } = useQuery({
    queryKey: ["chatUsers"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/messege");
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });


  if (chatUsers?.length === 0) return <div class="md:w-64 w-0">{chatUsers?.length}</div>;

  return (
    <div className="py-2 flex flex-col overflow-y-scroll no-scrollbar ">
      {isLoading && (
            <>
              <ChatSkeleton />
              <ChatSkeleton />
              <ChatSkeleton />
              <ChatSkeleton />
              <ChatSkeleton />
              <ChatSkeleton />
              <ChatSkeleton />
              <ChatSkeleton />
            </>
          )}
      {!isLoading && chatUsers?.map((user)=>(
        <Conversation key={user._id} user={user} />
      ))}
      
    </div>
  );
};

export default Conversations;
