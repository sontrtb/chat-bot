import { ScrollArea } from "@/components/ui/scroll-area"
import MessageItem from "./message-item"
import { IMessage, IMessageDisplay } from "@/types/message";
import MessageItemTyping from "./message-item-typing";
import { Dispatch, useEffect, useRef } from "react";

interface IMessageListProps {
    listMess: IMessageDisplay;
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
        <ScrollArea className="h-full pb-3 px-0 xl:px-10 items-center backdrop-opacity-30">
            <div className="mx-auto w-full xl:max-w-3xl">
                {
                    listMess.user.map((mess) => (
                        <MessageItem
                            key={mess.id}
                            messageUser={mess}
                            messageAssistant={listMess.assistant[mess.messageId as never] as unknown as IMessage[]}
                        />
                    ))
                }
                <MessageItemTyping setListMess={setListMess} scrollToBottom={scrollToBottom}/>
            </div>

            <div ref={lateRef} className="h-8"/>
        </ScrollArea>
    )
}

export default MessageList