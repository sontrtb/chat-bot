import { listBot } from "@/const/bot";
import { useGetCurrentChatBot } from "@/redux/hooks/chat-bot";
import { useGetCurrentMessageTyping } from "@/redux/hooks/message-typing";
import { CirclePause, Send } from "lucide-react"
import { useState } from "react";

interface IMessageInputProps {
    onSubmit?: (text: string) => void;
    showBot?: boolean;
}

function MessageInput(props: IMessageInputProps) {
    const { onSubmit, showBot = true } = props;

    const messageTyping = useGetCurrentMessageTyping()

    const idBotSelect = useGetCurrentChatBot()
    const botSelect = listBot.find(bot => idBotSelect === bot.id)

    const [text, setText] = useState("")

    const handleSubmit = () => {
        if (messageTyping.isTyping || text.length === 0) return;

        onSubmit?.(text)
        setText("")
    }

    return (
        <div className="">
            <div className="bg-neutral-100 rounded-xl py-1 w-full h-fit max-w-3xl mx-auto">
                <textarea
                    disabled={messageTyping.isTyping}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            handleSubmit()
                        }
                    }}
                    style={{ resize: "none" }}
                    className="h-16 outline-none bg-neutral-100 flex-1 px-4 font-light rounded-xl pt-2"
                    placeholder="Nhập tin nhắn..."
                />
                <div className="flex justify-end mx-1 pb-1">
                    <button className="cursor-pointer p-2 bg-neutral-800 mr-1 rounded-full" onClick={handleSubmit}>
                        {messageTyping.isTyping ? <CirclePause size="18px" color="white" /> : <Send size="18px" color="white" />}
                    </button>
                </div>
            </div>
            {
                showBot &&
                <div className="max-w-3xl mx-auto flex mt-2 items-center">
                    <p className="text-sm ml-3 font-light">Bạn đang sử dụng</p>
                    <div className="p-px ml-2 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg">
                        <div className="flex bg-white px-3 py-1 rounded-lg items-center">
                            <img src={botSelect?.icon} className="w-4 h-4 mr-2" />
                            <p className="text-sm font-light">{botSelect?.name}</p>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default MessageInput