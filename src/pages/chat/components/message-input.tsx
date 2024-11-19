import { Send } from "lucide-react"
import { useState } from "react";

interface IMessageInputProps {
    onSubmit?: (text: string) => void;
}

function MessageInput(props: IMessageInputProps) {
    const { onSubmit } = props;

    const [text, setText] = useState("")

    const handleSubmit = () => {
        onSubmit?.(text)
        setText("")
    }

    return (
        <div className="bg-neutral-100 rounded-full flex py-1 w-full h-fit">
            <input
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        handleSubmit()
                    }
                }}
                className="outline-none bg-neutral-100 flex-1 px-4 font-light rounded-full"
                placeholder="Nhập tin nhắn..."
            />
            <button className="cursor-pointer p-2 bg-neutral-200 mr-1 rounded-full" onClick={handleSubmit}>
                <Send size="20px" className="" />
            </button>
        </div>
    )
}

export default MessageInput