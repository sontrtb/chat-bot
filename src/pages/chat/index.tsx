import { useLocation, useSearchParams } from "react-router-dom";
import MessageInput from "./components/message-input"
import MessageList from "./components/message-list"
import { useEffect, useRef, useState } from "react";
import { IMessage } from "@/types/message";
import { useSetMessageTyping } from "@/redux/hooks/message-typing";
import { useQuery } from "@tanstack/react-query";
import queryKey from "@/const/query-key";
import { getMesages } from "@/api/chat";
import { useGetUser } from "@/redux/hooks/user";

function ChatScreen() {
    const [searchParams] = useSearchParams();
    const conId = searchParams.get("conId")

    const { state } = useLocation();
    const stateRef = useRef(state);

    const setMessageTyping = useSetMessageTyping()
    const user = useGetUser()

    const [listMess, setListMess] = useState<IMessage[]>([])

    const getMessagesQuery = useQuery({
        queryKey: [queryKey.getMessage, conId],
        queryFn: () => getMesages(conId ?? ""),
        enabled: !!conId,
    })

    console.log("state", stateRef.current)

    useEffect(() => {
        const initList = stateRef.current ? [stateRef.current] : []
        setListMess([...initList, ...getMessagesQuery.data ?? []].reverse() ?? [])
        window.history.replaceState({}, '')

        if(stateRef.current) {
            stateRef.current = null
        }
    }, [getMessagesQuery.data, state])

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
        <div className="flex flex-col h-[calc(100vh_-_80px)]">
            <MessageList listMess={listMess} setListMess={setListMess} />
            <div className="pb-4">
                <MessageInput onSubmit={sendMessage} autoFocus />
            </div>
        </div>
    )
}

export default ChatScreen