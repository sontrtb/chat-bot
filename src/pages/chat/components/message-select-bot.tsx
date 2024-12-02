import { cn } from "@/lib/utils";
import { useGetListChatBot } from "@/redux/hooks/chat-bot"
import { IBot } from "@/types/chatbot"

interface IMessageSelectBotProps {
    onChangeBot: (bot: IBot)  => void;
    botSelected: string[];
    disable?: boolean
}

function MessageSelectBot(props: IMessageSelectBotProps) {
    const {onChangeBot, botSelected, disable} = props

    const listBot = useGetListChatBot()

    return (
        <div className="flex justify-end mb-1">
            {
                listBot.map(bot => (
                    <button
                        disabled={disable}
                        key={bot.id}
                        className={cn("mx-1", disable && "cursor-wait")}
                        onClick={() => onChangeBot(bot)}
                    >
                        <img
                            src={import.meta.env.VITE_API_URL + bot.icon}
                            className={cn("w-6 h-6 p-1 rounded-full bg-secondary", botSelected.includes(bot.id) && "bg-red-100")}
                        />
                    </button>
                ))
            }
        </div>
    )
}

export default MessageSelectBot