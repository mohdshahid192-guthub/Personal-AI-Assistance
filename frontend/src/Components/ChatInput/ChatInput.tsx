import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faArrowUp } from "@fortawesome/free-solid-svg-icons"
import { useAiChat } from "@/src/Hooks/useAiChat";
import { useAppDispatch } from "@/src/Store/hooks";
import { addMessages } from "@/src/Store/chatSlice";

export default function ChatInput({hasChats = false}) {
     const [inputValue, setInputValue] = useState("")
     const dispatch = useAppDispatch()
     const aiChat = useAiChat()

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
       e.preventDefault()
       if (!inputValue.trim()) {
        return
       }
       const currentText = inputValue

       dispatch(addMessages({
        id: crypto.randomUUID(),
        text: currentText,
        sender: "Shahid",
        timestamp: new Date().toString()
       }))

       setInputValue("")

       aiChat.mutate(currentText, {
        
        onSuccess:(response) => {
          const answer = response.data.data.answer
           dispatch(addMessages({
            id: crypto.randomUUID(),
            text: answer,
            sender: "AI",
            timestamp: new Date().toString()
           }))

        },
        onError: (error) => {
        console.error("API Error:", error);
        dispatch(addMessages({
          id: crypto.randomUUID(),
          text: "Sorry, I am having trouble connecting to the server right now.",
          sender: "AI",
          timestamp: new Date().toISOString(),
        }));
      }
       })
    }

  return(
   <form  onSubmit={handleSubmit}  className={`w-[90%] sm:w-[70%] md:w-[60%] h-max rounded-lg border-2 bg-white fixed  ${hasChats? "bottom-0 mb-12": "bottom-1/3"} transition-all duration-300 grid grid-cols-[1fr_80px]`}>
     <div className="w-[85%] h-full rounded-lg flex items-center overflow-hidden">
     <textarea 
  id="chat-input"
  value={inputValue}
  rows={1}
  placeholder="Message Shareen..."
  className="w-full resize-none max-h-48 overflow-y-auto bg-transparent px-3 py-2 text-gray-800 outline-none"
  onInput={(e) => {
    const target = e.currentTarget;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  }}
  onChange={(e) =>  setInputValue(e.target.value)}
/>

     </div>

 <div className="h-full w-full flex items-end justify-center p-2">
               <button
               type="submit" className="flex h-10 w-10 rounded-full items-center bg-blue-600  justify-center text-center hover:bg-blue-700 cursor-pointer">
    <FontAwesomeIcon icon={faArrowUp} className="text-lg  text-white"/>
     </button>
       </div>
      
     
   </form>
  )
}