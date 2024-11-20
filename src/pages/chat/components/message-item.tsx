import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IMessage } from "@/types/message";
import { memo } from "react";

interface IMessageItemProps {
    message: IMessage
}

function MessageItem(props: IMessageItemProps) {
    const {message } = props;

    return (
        <div className={cn("mb-3 flex", message.isSend ? "justify-end" : "justify-start")}>
            {
                message.isSend ?
                    <p className="px-5 py-2.5 bg-neutral-100 rounded-3xl text-sm w-fit">
                        {message.message}
                    </p> :
                    <div className="flex">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="ml-2 px-5 py-2.5 bg-neutral-50 rounded-3xl text-sm w-fit ">
                            {message.message}
                        </p>
                    </div>
            }
        </div>
    )
}

export default memo(MessageItem)