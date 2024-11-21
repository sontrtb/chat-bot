import { ScrollArea } from "@/components/ui/scroll-area"
import MessageItem from "./message-item"
import { IMessage } from "@/types/message";
import MessageItemTyping from "./message-item-typing";
import { Dispatch, useEffect, useRef } from "react";

interface IMessageListProps {
    listMess: IMessage[];
    setListMess: Dispatch<React.SetStateAction<IMessage[]>>
}

function MessageList(props: IMessageListProps) {
    const { listMess, setListMess } = props;

    const lateRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        lateRef.current?.scrollIntoView({
            behavior: "smooth"
        })
    }

    useEffect(() => {
        scrollToBottom()
    }, [listMess])

    return (
        <ScrollArea className="h-full pb-3 px-10 items-center">
            <div className="max-w-3xl mx-auto">
                {
                    listMess.map((mess) => (
                        <MessageItem key={mess.id} message={mess} />
                    ))
                }
                <MessageItemTyping setListMess={setListMess} scrollToBottom={scrollToBottom}/>
            </div>

            <div ref={lateRef} className="h-8"/>
        </ScrollArea>
    )
}

export default MessageList