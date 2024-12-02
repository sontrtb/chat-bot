import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IMessage } from "@/types/message";
import { memo, useEffect, useRef, useState } from "react";
import { marked } from "marked";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, RefreshCcw } from "lucide-react";
import MessageSelectBot from "./message-select-bot";
import { IBot } from "@/types/chatbot";
import useGetMessage from "@/hooks/use-get-message";
import { useGetListChatBot } from "@/redux/hooks/chat-bot";
import { Skeleton } from "@/components/ui/skeleton";

interface IMessageItemProps {
    messageUser: IMessage
    messageAssistant: IMessage[]
}

function MessageItem(props: IMessageItemProps) {
    const { messageUser, messageAssistant } = props;

    const itemRef = useRef<HTMLDivElement>(null)

    const listBot = useGetListChatBot()

    const [listMessACurrent, setListMessACurrent] = useState<IMessage[]>(messageAssistant ?? [])
    const [messACurrent, setMessACurrent] = useState<IMessage>(messageAssistant?.[0])
    const [isFocus, setIsFocus] = useState(false)
    const [textTmp, setTextTmp] = useState<string>()

    const botSelected = listBot.find(bot => bot.id === messACurrent?.userId)

    useEffect(() => {
        setMessACurrent(messageAssistant?.[0])
        setListMessACurrent(messageAssistant ?? [])
    }, [messageAssistant])

    const { getMessage, isLoading } = useGetMessage({
        onTyping: (mess) => {
            setTextTmp(mess)
        },
        onDoneTyping: (newMess) => {
            setListMessACurrent([...listMessACurrent, newMess])
            setMessACurrent(newMess)
            setTextTmp(undefined);
        },
    })

    const onFocus = () => {
        setIsFocus(true)
        setTimeout(() => {
            setIsFocus(false)
        }, 300)
    }

    const handleCoppy = () => {
        navigator.clipboard.writeText(messACurrent.message)
            .then(onFocus)
    }

    const retryRenderMessage = () => {
        // console.log(message.message)
    }

    const onChangeBotMess = (bot: IBot) => {
        onFocus()
        const messACurrentTmp = listMessACurrent.find(m => m.userId === bot.id)
        if (!messACurrentTmp) {
            getMessage(messageUser.message, bot.id, messACurrent.replyToId)
            return;
        }

        setTextTmp(undefined)
        setMessACurrent(messACurrentTmp)
    }

    return (
        <>
            <div className={cn("mb-3 flex", "justify-end")} ref={itemRef}>
                <p className="px-5 py-2.5 rounded-3xl md:w-fit max-w-xs md:max-w-xl leading-8 bg-secondary">
                    {messageUser.message}
                </p>
            </div>

            <div className="mb-3 flex justify-start mt-8">
                <div>
                    <div className="flex">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={import.meta.env.VITE_API_URL + botSelected?.icon} alt="Icon bot send" />
                            <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div>
                            <MessageSelectBot onChangeBot={onChangeBotMess} botSelected={listMessACurrent.map(m => m.userId)} />
                            {
                                isLoading ?
                                    <Skeleton className="h-8 w-1/2 md:w-96 rounded-md ml-4 mt-2" /> :
                                    <article
                                        className={cn(
                                            "bg-secondary/50 prose dark:prose-invert ml-4 md:w-fit w-4/5 p-3 shadow-xl rouder rounded-xl border transition-transform duration-300 transform",
                                            isFocus && "scale-95"
                                        )}
                                        dangerouslySetInnerHTML={{ __html: marked.parse(textTmp ?? messACurrent?.message ?? "") as string }}
                                    />
                            }
                            <div className="ml-4 mt-1 p-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger onClick={handleCoppy}>
                                            <Copy size={18} className="mx-2 opacity-60" />
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom">
                                            <p>Sao chép</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger onClick={retryRenderMessage}>
                                            <RefreshCcw size={18} className="mx-2 opacity-60" />
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom">
                                            <p>Thử lại</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(MessageItem)