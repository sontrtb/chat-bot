import { useGetCurrentChatBot } from "@/redux/hooks/chat-bot";
import { useGetCurrentMessageTyping } from "@/redux/hooks/message-typing";
import { CirclePause, Send } from "lucide-react"
import { useState } from "react";

interface IMessageInputProps {
    onSubmit?: (text: string) => void;
}

function MessageInput(props: IMessageInputProps) {
    const { onSubmit } = props;

    const messageTyping = useGetCurrentMessageTyping()

    const botSelect = useGetCurrentChatBot()

    const [text, setText] = useState("")

    const handleSubmit = () => {
        if (messageTyping.isTyping || text.length === 0) return;
        onSubmit?.(text)
        setText("")
    }

    return (
        <div className="bg-secondary rounded-full py-3 w-full h-fit max-w-3xl mx-auto flex items-center px-2">
            <img src={import.meta.env.VITE_API_URL + botSelect?.icon} className="w-8 h-8 ml-2" />
            <input
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
            <button className="cursor-pointer mr-3" onClick={handleSubmit}>
                {messageTyping.isTyping ? <CirclePause size="24px" className="text-primary" /> : <Send size="24px" className="text-primary" />}
            </button>

        </div>
    )
}

export default MessageInput