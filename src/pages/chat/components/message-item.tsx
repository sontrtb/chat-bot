import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IMessage } from "@/types/message";
import { memo } from "react";
import { marked } from "marked";
import { useGetUser } from "@/redux/hooks/user";

interface IMessageItemProps {
    message: IMessage
}

function MessageItem(props: IMessageItemProps) {
    const { message } = props;

    const user = useGetUser()

    const isSend = user?.id === message.userId

    return (
        <div className={cn("mb-3 flex", isSend ? "justify-end" : "justify-start")}>
            {
                isSend ?
                    <p className="px-5 py-2.5 rounded-3xl md:w-fit md:max-w-fit max-w-xl leading-8 bg-secondary">
                        {message.message}
                    </p> :
                    <div>
                        <div className="flex">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <article
                                className="prose dark:prose-invert ml-4 pt-1 md:w-fit w-3/4"
                                dangerouslySetInnerHTML={{ __html: marked.parse(message.message) as string }}
                            />
                        </div>
                    </div>
            }
        </div>
    )
}

export default memo(MessageItem)