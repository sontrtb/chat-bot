import { cn } from "@/lib/utils"
import { useGetCurrentChatBot, useSetChatBot } from "@/redux/hooks/chat-bot"

interface IListBotProps {
    mode?: "mini" | "full"
    className?: string
}

function ListBot(props: IListBotProps) {
    const {mode = "mini", className} = props

    const isMini = mode === "mini"

    const setChatBot = useSetChatBot()
    const chatBot = useGetCurrentChatBot()

    const list = ["Chat GPT", "Google", "Hello", "Meo Meo", "Dog Hi", "Meoo1"]
    
    const goChatScreen = (bot: string) => {
        setChatBot(bot)
    }

    return (
        <div className={cn("grid", isMini ? "gap-4 grid-cols-2" : "gap-6 grid-cols-3",className)}>
            {
                list.map((bot, index) => (
                    <div
                        key={index}
                        onClick={() => goChatScreen(bot)}
                        className={
                            cn(
                                "p-3 flex rounded-md hover:bg-neutral-100 col-span-1 cursor-pointer",
                                !isMini && "justify-center",
                                chatBot === bot ? "border bg-neutral-50" : "m-[1px]"
                            )}
                    >
                        <img className="rounded-full h-10 w-10 mr-3" src="https://chatgpt.com/backend-api/content?id=file-SxYQO0Fq1ZkPagkFtg67DRVb&gizmo_id=g-2fkFE8rbu&ts=481116&p=gpp&sig=d6dccdbc96953037667f4f4f5e12e2a02e0e71132847d746ad83f4a0982d3ccc&v=0"/>
                        <div>
                            <p className="text-sm font-semibold">{bot}</p>
                            <p className="text-xs text-neutral-400">By Google</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ListBot