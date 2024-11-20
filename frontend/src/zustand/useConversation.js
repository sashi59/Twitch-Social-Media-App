import {create} from "zustand"

const useConversation = create((set)=>({
    selectedConversation : null,
    setSelectedConversation : (selectedConversation)=>set({selectedConversation:selectedConversation}),
    messeges:[],
    setMesseges : (messeges)=> set({messeges}),
}))

export default useConversation;