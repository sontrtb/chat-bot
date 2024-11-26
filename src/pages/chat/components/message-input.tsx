import { useGetCurrentChatBot } from "@/redux/hooks/chat-bot";
import { useGetCurrentMessageTyping, useSetMessageTypingDone } from "@/redux/hooks/message-typing";
import { CirclePause, Send } from "lucide-react"
import { useEffect, useRef, useState } from "react";

interface IMessageInputProps {
    onSubmit?: (text: string) => void;
    autoFocus?: boolean;
}

function MessageInput(props: IMessageInputProps) {
    const { onSubmit, autoFocus } = props;

    const inputRef = useRef<HTMLInputElement>(null)

    const messageTyping = useGetCurrentMessageTyping()
    const setMessageTypingDone = useSetMessageTypingDone()

    const botSelect = useGetCurrentChatBot()

    const [text, setText] = useState("")

    const handleSubmit = () => {
        if (messageTyping.isTyping || text.length === 0) return;
        onSubmit?.(text)
        setText("")
    }

    useEffect(() => {
        if (!messageTyping.isTyping && autoFocus) {
            inputRef.current?.focus()
        }
    }, [autoFocus, messageTyping.isTyping])

    const handleCancel = () => {
        setMessageTypingDone()
    }

    return (
        <div className="bg-secondary rounded-full py-2 md:py-3 w-full h-fit max-w-3xl mx-auto flex items-center px-1 md:px-2">
            <img src={import.meta.env.VITE_API_URL + botSelect?.icon} className="w-8 h-8 ml-2" />
            <input
                ref={inputRef}
                autoFocus={autoFocus}
                disabled={messageTyping.isTyping}
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        handleSubmit()
                    }
                }}
                style={{ resize: "none" }}
                className="outline-none bg-secondary w-full flex-1 px-4 font-light"
                placeholder="Hãy hỏi tôi..."
            />
            {messageTyping.isTyping ?
                <button className="cursor-pointer mr-3" onClick={handleCancel}>
                    <CirclePause size="24px" className="text-primary" />
                </button> :
                <button className="cursor-pointer mr-3" onClick={handleSubmit}>
                    <Send size="24px" className="text-primary" />
                </button>
            }
        </div>
    )
}

export default MessageInput