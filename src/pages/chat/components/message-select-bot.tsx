import { EModeApp, useGetMode } from "@/hooks/use-get-mode";
import { useIsMobile } from "@/hooks/use-mobile";
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

    const isMobile = useIsMobile();
    const mode = useGetMode();

    const isDisableHover = isMobile || mode === EModeApp.KIOSK

    const [isHover, setIsHover] = useState(false)

    const rightFullConst = mode === EModeApp.KIOSK ? 60 : 30

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
                            style={{ right: `${index * ((isHover || isDisableHover) ? rightFullConst : 16)}px`, transition: "all 0.3s ease", }}
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