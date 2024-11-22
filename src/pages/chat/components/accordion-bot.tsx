import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useGetCurrentChatBot, useSetChatBot } from "@/redux/hooks/chat-bot"
import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { getListBot } from "@/api/bot"
import { useGetListChatBot, useSetListChatBot } from "@/redux/hooks/chat-list-bot"

function AccordionBot() {
    const setChatBot = useSetChatBot()
    const botSelect = useGetCurrentChatBot()

    const setListChatBot = useSetListChatBot()
    const listBot =  useGetListChatBot()

    const getList = async () => {
        getListBot().then(res => {
            setListChatBot(res)
            if(!botSelect) {
                setChatBot(res[0])
            }
        })   
    }

    useEffect(() => {
        getList()
    }, [])
    
    return (
        <div className="absolute z-10 top-4">
            <Accordion type="single" collapsible >
                <AccordionItem value="item-1" className="w-12 bg-secondary p-1 rounded-lg shadow">
                    <AccordionContent>
                        {
                            listBot.map(bot => (
                                <img
                                    key={bot.id}
                                    src={import.meta.env.VITE_API_URL + bot.icon}
                                    className={cn("w-10 p-2 hover:bg-neutral-200 rounded my-1 cursor-pointer", botSelect?.id === bot.id ? "border" : 'border-transparent')}
                                    onClick={() => setChatBot(bot)}
                                />
                            ))
                        }
                        <div className="border"/>
                    </AccordionContent>
                    <AccordionTrigger className="w-full flex-col">
                        <img src={import.meta.env.VITE_API_URL + botSelect?.icon} className="w-10  p-2" />
                    </AccordionTrigger>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default AccordionBot