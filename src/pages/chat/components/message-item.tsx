import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IMessage } from "@/types/message";
import { memo } from "react";
import { marked } from "marked";

interface IMessageItemProps {
    message: IMessage
}

function MessageItem(props: IMessageItemProps) {
    const { message } = props;

    console.log("marked.parse(message.message)", marked.parse(message.message))

    return (
        <div className={cn("mb-3 flex", message.isSend ? "justify-end" : "justify-start")}>
            {
                message.isSend ?
                    <p className="px-5 py-2.5 rounded-3xl w-fit leading-8 bg-secondary">
                        {message.message}
                    </p> :
                    <div>
                        <div className="flex">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <article
                                className="prose ml-4 pt-1 w-fit"
                                dangerouslySetInnerHTML={{ __html: marked.parse(message.message) }}
                            />
                        </div>
                    </div>
            }
        </div>
    )
}

export default memo(MessageItem)