import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IMessage } from "@/types/message";
import { memo, useState } from "react";
import { marked } from "marked";
import { useGetUser } from "@/redux/hooks/user";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, RefreshCcw } from "lucide-react";
import { useGetListChatBot } from "@/redux/hooks/chat-bot";

interface IMessageItemProps {
    message: IMessage
}

function MessageItem(props: IMessageItemProps) {
    const { message } = props;

    const user = useGetUser()
    const isSend = user?.id === message.userId

    const listBot = useGetListChatBot()
    const botSend = listBot?.find(bot => bot.id === message.userId)

    const [isCoppyDone, setIsCopyDone] = useState(false)

    const handleCoppy = () => {
        navigator.clipboard.writeText(message.message)
        .then(() => {
            setIsCopyDone(true)
            setTimeout(() => {
                setIsCopyDone(false)
            }, 300)
        })
    }

    const retryRenderMessage = () => {
        console.log(message.message)
    }

    return (
        <div className={cn("mb-3 flex", isSend ? "justify-end" : "justify-start")}>
            {
                isSend ?
                    <p className="px-5 py-2.5 rounded-3xl md:w-fit max-w-xs md:max-w-xl leading-8 bg-secondary">
                        {message.message}
                    </p> :
                    <div>
                        <div className="flex">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={import.meta.env.VITE_API_URL + botSend?.icon} alt="Icon bot send" />
                                <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                            <div>
                                <article
                                    className={cn(
                                        "bg-secondary/30 prose dark:prose-invert ml-4 md:w-fit w-4/5 p-3 shadow-xl rouder rounded-xl border transition-transform duration-300 transform",
                                        isCoppyDone ? "scale-95 backdrop-brightness-90" : ""
                                    )}
                                    dangerouslySetInnerHTML={{ __html: marked.parse(message.message) as string }}
                                />
                                <div className="ml-4 mt-1 p-2">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger onClick={handleCoppy}>
                                                <Copy size={18} className="mx-2"/>
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom">
                                                <p>Sao chép</p>
                                            </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger onClick={retryRenderMessage}>
                                                <RefreshCcw size={18} className="mx-2"/>
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
            }
        </div>
    )
}

export default memo(MessageItem)