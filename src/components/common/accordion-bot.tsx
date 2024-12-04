import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useGetCurrentChatBot, useSetChatBot, useSetListChatBot } from "@/redux/hooks/chat-bot"
import { cn } from "@/lib/utils"
import { getListBot } from "@/api/bot"
import queryKey from "@/const/query-key"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import { useIsMobile } from "@/hooks/use-mobile"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { EModeApp, useGetMode } from "@/hooks/use-get-mode"


function AccordionBot() {
    const setChatBot = useSetChatBot()
    const botSelect = useGetCurrentChatBot()
    const setListChatBot = useSetListChatBot()

    const isMobile = useIsMobile()
    const mode = useGetMode();

    const getListBotQuery = useQuery({
        queryKey: [queryKey.getListBot],
        queryFn: getListBot
    })

    useEffect(() => {
        setListChatBot(getListBotQuery.data ?? [])
    }, [getListBotQuery.data])

    useEffect(() => {
        if (!botSelect?.id && getListBotQuery.data?.[0]) {
            setChatBot(getListBotQuery.data[0])
        }
    }, [botSelect, getListBotQuery.data, setChatBot])

    if (isMobile) {
        return (
            <Drawer>
                <DrawerTrigger asChild className={cn(mode === EModeApp.KIOSK && "scale-[1.35] mt-1.5 ml-2")}>
                    <Button size="icon" variant="outline">
                        <img src={import.meta.env.VITE_API_URL + botSelect?.icon} className="w-10 h-10 p-2" />
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="h-72">
                    <DrawerHeader className="text-left">
                        <DrawerTitle>Chọn AI</DrawerTitle>
                    </DrawerHeader>
                    <div className="flex justify-around">
                        {
                            getListBotQuery.data?.map(bot => (
                                <img
                                    key={bot.id}
                                    src={import.meta.env.VITE_API_URL + bot.icon}
                                    className={cn("p-2 hover:bg-neutral-200 rounded my-1 cursor-pointer", botSelect?.id === bot.id ? "border" : 'border-transparent', mode === EModeApp.KIOSK ? "w-16 h-16" : "w-10 h-10 ")}
                                    onClick={() => setChatBot(bot)}
                                />
                            ))
                        }
                    </div>
                    <Card className="mx-4 pt-4">
                        <CardContent>
                            <h3 className="text-xl font-semibold bg-gradient-to-r from-violet-500 via-yellow-500 to-red-500 text-transparent bg-clip-text">{botSelect?.name}</h3>
                            <p>{botSelect?.description}</p>
                        </CardContent>
                    </Card>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <div>
            <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1" className="w-12 bg-secondary p-1 rounded-lg shadow">
                    <AccordionContent>
                        {
                            getListBotQuery.data?.map(bot => (
                                <HoverCard key={bot.id} openDelay={50} closeDelay={50}>
                                    <HoverCardTrigger asChild>
                                        <img
                                            src={import.meta.env.VITE_API_URL + bot.icon}
                                            className={cn("p-2 hover:bg-neutral-200 rounded my-1 cursor-pointer", botSelect?.id === bot.id ? "border" : 'border-transparent', mode === EModeApp.KIOSK ? "w-16 h-16" : "w-10 h-10 ")}
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
                        <img src={import.meta.env.VITE_API_URL + botSelect?.icon} className={cn("p-2",  mode === EModeApp.KIOSK ? "w-16 h-16" : "w-10 h-10")} />
                    </AccordionTrigger>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default AccordionBot