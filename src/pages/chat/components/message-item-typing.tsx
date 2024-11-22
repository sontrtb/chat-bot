import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetCurrentMessageTyping, useSetMessageTypingDone } from "@/redux/hooks/message-typing";
import { useGetUser } from "@/redux/hooks/user";
import { IMessage } from "@/types/message";
import { Dispatch, Fragment, useEffect, useState } from "react";
import { marked } from "marked"
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCurrentChatBot } from "@/redux/hooks/chat-bot";

interface IMessageItemTypingProps {
    setListMess: Dispatch<React.SetStateAction<IMessage[]>>
    scrollToBottom: () => void
}

function MessageItemTyping(props: IMessageItemTypingProps) {
    const { setListMess, scrollToBottom } = props

    const messageTyping = useGetCurrentMessageTyping()
    const setMessageTypingDone = useSetMessageTypingDone()

    const user = useGetUser()

    const botSelect = useGetCurrentChatBot()

    const [isLoading, setIsLoading] = useState(false)
    const [textTmp, setTextTmp] = useState("")

    const getMessage = async (message: string) => {
        setIsLoading(true)
        fetch(`${import.meta.env.VITE_API_URL}/c/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // "responseType": "stream",
                "Authorization": `Bearer ${user?.token}`
            },
            body: JSON.stringify({
                message: message,
                conId: "",
                target: botSelect.id
            })
        })
            .then(async response => response.body?.getReader())
            .then(reader => {
                const decoder = new TextDecoder();
                let textMessTmp = ''

                function readStream() {
                    reader?.read().then(({ done, value }) => {
                        if (done) {
                            setMessageTypingDone()
                            const newMess: IMessage = {
                                id: new Date().getTime(),
                                message: textMessTmp,
                                isSend: false
                            }
                            setListMess(pre => [...pre, newMess])
                            setTextTmp("")
                            return;
                        }

                        const data = decoder.decode(value, { stream: true });

                        let text = "";
                        if(data.includes("data:")) {
                            text = data.split("data:")
                                .filter(t => t.length > 0)
                                .map(t => JSON.parse(t).result.message)
                                .join("")
                        } else {
                            const dataParse = JSON.parse(data)
                            text = dataParse.message
                        }
                        textMessTmp += text
                        setTextTmp(`${textMessTmp}`)
                        scrollToBottom()

                        readStream();
                    });
                }

                readStream();
            })
            .catch(error => {
                setMessageTypingDone()
                console.error('Error sending POST request:', error);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        if (messageTyping.isTyping) {
            getMessage(messageTyping.message ?? "")
        }
    }, [messageTyping])

    if (!messageTyping.isTyping) return <Fragment />

    return (
        <div className={"mb-3 flex justify-start"}>
            <div className="flex">
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {
                    isLoading ?
                        <Skeleton className="h-8 w-96 rounded-md ml-4 mt-2" /> :
                        <article
                            className="prose dark:prose-invert ml-4 pt-1 w-fit"
                            dangerouslySetInnerHTML={{ __html: marked.parse(textTmp) }}
                        />
                }
            </div>
        </div>
    )
}

export default MessageItemTyping

