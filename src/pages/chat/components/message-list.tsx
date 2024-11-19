import { ScrollArea } from "@/components/ui/scroll-area"
import MessageItem from "./message-item"

function MessageList() {
    const listMess = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]

    return (
        <ScrollArea className="h-full pb-3 px-10">
            {
                listMess.map((mess) => (
                    <MessageItem key={mess} isSend={false}/>
                ))
            }
        </ScrollArea>
    )
}

export default MessageList