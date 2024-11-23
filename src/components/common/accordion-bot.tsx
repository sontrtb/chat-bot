import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useGetCurrentChatBot, useSetChatBot } from "@/redux/hooks/chat-bot"
import { cn } from "@/lib/utils"
import { getListBot } from "@/api/bot"
import queryKey from "@/const/query-key"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"

function AccordionBot() {
    const setChatBot = useSetChatBot()
    const botSelect = useGetCurrentChatBot()

    const getListBotQuery = useQuery({
        queryKey: [queryKey.getListBot],
        queryFn: getListBot
    })

    useEffect(() => {
        if (!botSelect?.id && getListBotQuery.data?.[0]) {
            setChatBot(getListBotQuery.data[0])
        }
    }, [botSelect, getListBotQuery.data, setChatBot])

    return (
        <div className="absolute z-10 top-4">
            <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1" className="w-12 bg-secondary p-1 rounded-lg shadow">
                    <AccordionContent>
                        {
                            getListBotQuery.data?.map(bot => (
                                <HoverCard key={bot.id} openDelay={50} closeDelay={50}>
                                    <HoverCardTrigger asChild>
                                        <img
                                            src={import.meta.env.VITE_API_URL + bot.icon}
                                            className={cn("w-10 h-10 p-2 hover:bg-neutral-200 rounded my-1 cursor-pointer", botSelect?.id === bot.id ? "border" : 'border-transparent')}
                                            onClick={() => setChatBot(bot)}
                                        />
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-80" side="right">
                                        <h3 className="text-xl font-semibold bg-gradient-to-r from-violet-500 via-yellow-500 to-red-500 text-transparent bg-clip-text">{bot.name}</h3>
                                        <p>{bot.description}</p>
                                    </HoverCardContent>
                                </HoverCard>
                            ))
                        }
                        <div className="border" />
                    </AccordionContent>
                    <AccordionTrigger className="w-full flex-col">
                        <img src={import.meta.env.VITE_API_URL + botSelect?.icon} className="w-10 h-10 p-2" />
                    </AccordionTrigger>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default AccordionBot