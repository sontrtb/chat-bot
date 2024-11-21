import { useParams } from "react-router-dom";
import MessageInput from "./components/message-input"
import MessageList from "./components/message-list"
// import { sendMess } from "@/api/chat";
// import axios from "axios";
import { useState } from "react";
import { IMessage } from "@/types/message";
import { useSetMessageTyping } from "@/redux/hooks/message-typing";
import AccordionBot from "./components/accordion-bot";

function ChatScreen() {
    const { chatId } = useParams();

    const setMessageTyping = useSetMessageTyping()

    console.log("chatId", chatId)

    const [listMess, setListMess] = useState<IMessage[]>([])

    const sendMessage = async (message: string) => {
        const newMess: IMessage = {
            id: new Date().getTime(),
            isSend: true,
            message: message
        }
        setListMess(pre => [...pre, newMess])
        
        setMessageTyping(message)
    }

    return (
        <div className="flex flex-col h-[calc(100vh_-_80px)] p-3">
            <AccordionBot />
            <MessageList listMess={listMess} setListMess={setListMess}/>
            <MessageInput onSubmit={sendMessage} />
        </div>
    )
}

export default ChatScreen