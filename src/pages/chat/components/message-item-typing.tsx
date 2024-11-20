import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetCurrentMessageTyping, useSetMessageTypingDone } from "@/redux/hooks/message-typing";
import { IMessage } from "@/types/message";
import { Dispatch, Fragment, useEffect, useState } from "react";

function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789                                        ';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

interface IMessageItemTypingProps {
    setListMess: Dispatch<React.SetStateAction<IMessage[]>>
    scrollToBottom: () => void
}

function MessageItemTyping(props: IMessageItemTypingProps) {
    const {setListMess, scrollToBottom} = props

    const messageTyping = useGetCurrentMessageTyping()
    const setMessageTypingDone = useSetMessageTypingDone()

    const [textTmp, setTextTmp] = useState("")

    useEffect(() => {
        let timeOut: NodeJS.Timeout;
        if(messageTyping.isTyping) {
            let textMessTmp = ''
            const interval = setInterval(() => {
                textMessTmp += makeid(2)
                setTextTmp(`${textMessTmp}`)
                scrollToBottom()
            }, 30)

            timeOut = setTimeout(() => {
                clearInterval(interval)
                setMessageTypingDone()
                const newMess: IMessage = {
                    id: new Date().getTime(),
                    message: textMessTmp,
                    isSend: false
                }
                setListMess(pre => [...pre, newMess])
                setTextTmp("")
            }, 5000)
        }

        return () => clearTimeout(timeOut)
    }, [messageTyping])

    if(!messageTyping.isTyping) return <Fragment />

    return (
        <div className={"mb-3 flex justify-start"}>
            <div className="flex">
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="ml-2 px-5 py-2.5 bg-neutral-50 rounded-3xl text-sm w-fit ">
                    {textTmp}
                </p>
            </div>
        </div>
    )
}

export default MessageItemTyping