import { useLocation, useSearchParams } from "react-router-dom";
import MessageInput, { IDataSubmitInput } from "./components/message-input"
import MessageList from "./components/message-list"
import { useEffect, useMemo, useState } from "react";
import { ERoleMessage, IMessage, IMessageDisplay } from "@/types/message";
import { useSetMessageTyping } from "@/redux/hooks/message-typing";
import { useQuery } from "@tanstack/react-query";
import queryKey from "@/const/query-key";
import { getMesages } from "@/api/chat";
import { useGetUser } from "@/redux/hooks/user";

function ChatScreen() {
    const [searchParams] = useSearchParams();
    const conId = searchParams.get("conId")

    const { state } = useLocation();

    const setMessageTyping = useSetMessageTyping()
    const user = useGetUser()

    const [listMess, setListMess] = useState<IMessage[]>([])

    const getMessagesQuery = useQuery({
        queryKey: [queryKey.getMessage, conId],
        queryFn: () => getMesages(conId ?? ""),
        enabled: !!conId && !state,
    })

    useEffect(() => {
        const initList = state ? [state] : []
        setListMess([...initList, ...getMessagesQuery.data ?? []].reverse() ?? [])
    }, [getMessagesQuery.data, state])

    const sendMessage = async (messSend: IDataSubmitInput) => {
        const newMess: IMessage = {
            id: new Date().getTime(),
            userId: user?.id ?? "me",
            message: messSend.message,
            role: ERoleMessage.USER,
            messageId: `${new Date().getTime()}`
        }
        setListMess(pre => [...pre, newMess])
        setMessageTyping({
            message: messSend.message,
            fileName: messSend.fileName,
            fileData: messSend.fileData,

            messageId: newMess.messageId
        })
    }

    const listMessFormat: IMessageDisplay = useMemo(() => {
        const listMessFormatTmp: IMessageDisplay = {
            user: [],
            assistant: []
        }
        listMess.forEach(mess => {
            if (mess.role === ERoleMessage.USER) {
                listMessFormatTmp.user.push(mess)
            } else {
                const keysArr = Object.keys(listMessFormatTmp.assistant)
                if (!!mess.replyToId && keysArr.includes(mess.replyToId)) {
                    (listMessFormatTmp.assistant[mess.replyToId as unknown as number] as unknown as IMessage[]).push(mess)
                } else {
                    (listMessFormatTmp.assistant[mess.replyToId as unknown as number] as unknown as IMessage[]) = [mess]
                }
            }

        })

        return listMessFormatTmp
    }, [listMess])

    return (
        <div className="flex flex-col h-[calc(100vh_-_80px)] px-2 xl:px-0 bg-[url('/images/background.png')] bg-no-repeat bg-center bg-[length:80%] xl:bg-[length:600px]">
            <MessageList listMess={listMessFormat} setListMess={setListMess} />
            <div className="pb-4">
                <MessageInput onSubmit={sendMessage} autoFocus />
            </div>
        </div>
    )
}

export default ChatScreen