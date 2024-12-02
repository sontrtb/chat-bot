import { cn } from "@/lib/utils";
import { useGetListChatBot } from "@/redux/hooks/chat-bot"
import { IBot } from "@/types/chatbot"
import { useState } from "react";

interface IMessageSelectBotProps {
    onChangeBot: (bot: IBot) => void;
    botSelected: string[];
    disable?: boolean
}

function MessageSelectBot(props: IMessageSelectBotProps) {
    const { onChangeBot, botSelected, disable } = props

    const listBot = useGetListChatBot()

    const [isHover, setIsHover] = useState(false)

    return (
        <div className="flex justify-end">
            <div
                className="h-8 relative w-48"
                onMouseOver={() => { setIsHover(true) }}
                onMouseOut={() => { setIsHover(false) }}
            >
                {
                    listBot.map((bot, index) => (
                        <button
                            disabled={disable}
                            key={bot.id}
                            className={cn("absolute hover:scale-125 ", disable && "cursor-wait")}
                            style={{ right: `${index * (isHover ? 30 : 16)}px`, transition: "all 0.3s ease", }}
                            onClick={() => onChangeBot(bot)}
                        >
                            <img
                                src={import.meta.env.VITE_API_URL + bot.icon}
                                className={cn("w-6 h-6 p-1 rounded-full bg-secondary border", botSelected.includes(bot.id) && "bg-blue-200")}
                            />
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default MessageSelectBot