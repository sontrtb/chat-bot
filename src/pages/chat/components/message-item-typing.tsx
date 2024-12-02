import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetCurrentMessageTyping } from "@/redux/hooks/message-typing";
import { IMessage } from "@/types/message";
import { Dispatch, Fragment, useEffect, useState } from "react";
import { marked } from "marked"
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCurrentChatBot, useGetListChatBot } from "@/redux/hooks/chat-bot";
import useGetMessage from "@/hooks/use-get-message";

interface IMessageItemTypingProps {
    setListMess: Dispatch<React.SetStateAction<IMessage[]>>
    scrollToBottom: () => void
}

function MessageItemTyping(props: IMessageItemTypingProps) {
    const { setListMess, scrollToBottom } = props

    const messageTyping = useGetCurrentMessageTyping()

    const botSelect = useGetCurrentChatBot()

    const listBot = useGetListChatBot()
    const botSend = listBot?.find(bot => bot.id === botSelect?.id)

    const [textTmp, setTextTmp] = useState("")

    const { getMessage, isLoading } = useGetMessage({
        onTyping: (mess) => {
            setTextTmp(mess)
            scrollToBottom()
        },
        onDoneTyping: (newMess) => {
            const messageIdSendCurrent = messageTyping.messageId
            setListMess((pre) => {
                const newListMess = [...pre]
                const messageSendIndex = newListMess.findIndex(e => e.messageId === messageIdSendCurrent)
                newListMess[messageSendIndex] = { ...newListMess[messageSendIndex], messageId: newMess.replyToId ?? "" }
                newListMess.push(newMess)
                return newListMess
            });
            setTextTmp("");
        },
    })

    useEffect(() => {
        if (messageTyping.isTyping) {
            const messSend = {
                message: messageTyping.message,
                fileName: messageTyping.fileName,
                fileData: messageTyping.fileData,
            }
            getMessage(messSend, botSelect?.id)
        }
    }, [messageTyping])


    if (!messageTyping.isTyping) return <Fragment />

    return (
        <div className={"mb-3 flex justify-start"}>
            <div className="flex">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={import.meta.env.VITE_API_URL + botSend?.icon} alt="Icon AI" />
                    <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div>
                    <div className="h-8" />
                    {
                        isLoading ?
                            <Skeleton className="h-8 w-1/2 md:w-96 rounded-md ml-4 mt-2" /> :
                            <article
                                className="bg-secondary/50 prose dark:prose-invert ml-4 pt-1 md:w-fit w-4/5  p-3 shadow-xl rouder rounded-xl border"
                                dangerouslySetInnerHTML={{ __html: marked.parse(textTmp) as string }}
                            />
                    }
                </div>
            </div>
        </div>
    )
}

export default MessageItemTyping

