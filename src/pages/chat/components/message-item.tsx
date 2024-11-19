import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface IMessageItemProps {
    isSend: boolean
}

function MessageItem(props: IMessageItemProps) {
    const { isSend } = props;

    return (
        <div className={cn("mb-3 flex", isSend ? "justify-end" : "justify-start")}>
            {
                isSend ?
                    <p className="px-5 py-2.5 bg-neutral-100 rounded-full text-sm w-fit">
                        Xin chao toi la GPT
                    </p> :
                    <div className="flex items-center">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="ml-2 px-5 py-2.5 bg-neutral-50 rounded-full text-sm w-fit ">
                            Xin chao toi la GPT
                        </p>
                    </div>
            }
        </div>
    )
}

export default MessageItem