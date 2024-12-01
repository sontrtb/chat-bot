import { cn } from "@/lib/utils";
import { useGetListChatBot } from "@/redux/hooks/chat-bot"
import { IBot } from "@/types/chatbot"

interface IMessageSelectBotProps {
    onChangeBot: (bot: IBot)  => void;
    botSelected: string[]
}

function MessageSelectBot(props: IMessageSelectBotProps) {
    const {onChangeBot, botSelected} = props

    const listBot = useGetListChatBot()

    console.log("botSelected", botSelected, listBot)

    return (
        <div className="flex justify-end mb-1">
            {
                listBot.map(bot => (
                    <div key={bot.id} className="cursor-pointer mx-1" onClick={() => onChangeBot(bot)}>
                        <img
                            src={import.meta.env.VITE_API_URL + bot.icon}
                            className={cn("w-8 h-8 p-1 rounded-full bg-secondary", botSelected.includes(bot.id) && "bg-red-100")}
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default MessageSelectBot