import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import {  useQuery } from "@tanstack/react-query";
import useConversation from "../../../zustand/useConversation";

const MessegeContainer = () => {
  
  const {setSelectedConversation, selectedConversation} = useConversation();
  
  useEffect(()=>{

    return ()=> setSelectedConversation(null);
  },[setSelectedConversation]);
  return (
    <div className="w-full flex flex-col p-2">
      {/* Header */}

      {!selectedConversation ? (
        <NoChatSelected/>
      ) : (
        <>
          <div className="bg-sky-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">{selectedConversation?.fullName}</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessegeContainer;

const NoChatSelected = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
