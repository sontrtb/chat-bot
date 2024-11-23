import { useSearchParams } from "react-router-dom";
import MessageInput from "./components/message-input"
import MessageList from "./components/message-list"
import { useEffect, useState } from "react";
import { IMessage } from "@/types/message";
import { useSetMessageTyping } from "@/redux/hooks/message-typing";
import { useQuery } from "@tanstack/react-query";
import queryKey from "@/const/query-key";
import { getMesages } from "@/api/chat";
import { useGetUser } from "@/redux/hooks/user";

function ChatScreen() {
    const [searchParams] = useSearchParams();
    const conId = searchParams.get("conId")

    const setMessageTyping = useSetMessageTyping()
    const user = useGetUser()

    const [listMess, setListMess] = useState<IMessage[]>([])

    const getMessagesQuery = useQuery({
        queryKey: [queryKey.getMessage, conId],
        queryFn: () => getMesages(conId ?? ""),
        enabled: !!conId && conId !== "new",
    })

    useEffect(() => {
        setListMess(getMessagesQuery.data?.reverse() ?? [])
    }, [getMessagesQuery.data])

    const sendMessage = async (message: string) => {
        const newMess: IMessage = {
            id: new Date().getTime(),
            userId: user?.id ?? "me",
            message: message
        }
        setListMess(pre => [...pre, newMess])
        
        setMessageTyping(message)
    }

    return (
        <div className="flex flex-col h-[calc(100vh_-_80px)] p-3">
            <MessageList listMess={listMess} setListMess={setListMess}/>
            {/* <div style={{position: "sticky", bottom: 10}}> */}
                <MessageInput onSubmit={sendMessage} />
            {/* </div> */}
        </div>
    )
}

export default ChatScreen