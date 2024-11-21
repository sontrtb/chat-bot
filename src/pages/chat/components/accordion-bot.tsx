import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { listBot } from "@/const/bot"
import { useGetCurrentChatBot, useSetChatBot } from "@/redux/hooks/chat-bot"
import { cn } from "@/lib/utils"

function AccordionBot() {
    const setChatBot = useSetChatBot()
    const idBotSelect = useGetCurrentChatBot()
    const botSelect = listBot.find(bot => idBotSelect === bot.id)
    
    return (
        <div className="absolute z-10 top-20">
            <Accordion type="single" collapsible >
                <AccordionItem value="item-1" className="w-12 bg-[#ffffff80] p-1 rounded-lg shadow">
                    <AccordionContent>
                        {
                            listBot.map(bot => (
                                <img
                                    key={bot.id}
                                    src={bot.icon}
                                    className={cn("w-10 p-2 hover:bg-neutral-200 rounded my-1 cursor-pointer border", idBotSelect !== bot.id && "border-[#ffffff80]")}
                                    onClick={() => setChatBot(bot.id)}
                                />
                            ))
                        }
                        <div className="border"/>
                    </AccordionContent>
                    <AccordionTrigger className="w-full flex-col">
                        <img src={botSelect?.icon} className="w-10  p-2 " />
                    </AccordionTrigger>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default AccordionBot