import { useParams } from "react-router-dom";
import MessageInput from "./components/message-input"
import MessageList from "./components/message-list"
import { sendMess } from "@/api/chat";
import axios from "axios";
import { useState } from "react";
import { IMessage } from "@/types/message";
import { useSetMessageTyping } from "@/redux/hooks/message-typing";

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

        // setTimeout(() => {
        //     const newMessRep: IMessage = {
        //         id: new Date().getTime(),
        //         isSend: false,
        //         message: "Chat bot trả lời"
        //     } 
        //     setListMess(pre => [...pre, newMessRep])
        // }, 1000)

        // const response = await axios.post(
        //     'https://5c95-14-248-85-36.ngrok-free.app/api/c/chat',
        //     {
        //         message
        //     },
        //     {
        //         headers: {
        //             "Access-Control-Allow-Origin": "*",
        //             "Content-Type": "application/json",
        //             Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmOWVjMzYzNS1kNThmLTQ4NmYtOWVhOS1hYjlmZjcyMjRkZTIiLCJhdXRoIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dLCJpYXQiOjE3MzIwOTc4MjAsImV4cCI6MTczMjcwMjYyMH0._hbMSYi1Cp_Xf2HaSZT_9nXbH1FqTumyJSthYvzPqUs`,
        //             responseType: 'stream',
        //         },
        //     },

        // )
        
        // const stream = response.data;

        // stream.on('data', (data: unknown) => {
        //     console.log(data);
        // });

        // stream.on('end', () => {
        //     console.log("stream done");
        // });
    }

    return (
        <div className="flex flex-col h-[calc(100vh_-_80px)] p-3">
            <MessageList listMess={listMess} setListMess={setListMess}/>
            <MessageInput onSubmit={sendMessage} />
        </div>
    )
}

export default ChatScreen