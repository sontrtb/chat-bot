import MessageInput from "../chat/components/message-input"
import { useNavigate } from "react-router-dom";
import { useSetMessageTyping } from "@/redux/hooks/message-typing";
import { Button } from "@/components/ui/button";
import { TypeAnimation } from 'react-type-animation';
import { useMutation, useQuery } from "@tanstack/react-query";
import { createNewChat } from "@/api/chat";
import queryKey from "@/const/query-key";
import { getListBot } from "@/api/bot";
import { useSetChatBot } from "@/redux/hooks/chat-bot";

function HomeScreen() {
    const navigate = useNavigate();

    const setMessageTyping = useSetMessageTyping()
    const setChatBot = useSetChatBot()

    const createChatMutation = useMutation({
        mutationFn: createNewChat
    })

    const getListBotQuery = useQuery({
        queryKey: [queryKey.getListBot],
        queryFn: getListBot
    })

    const handleSendMess = (mess: string) => {
        createChatMutation.mutate(undefined, {
            onSuccess: (res) => {
                setTimeout(() => {
                    setMessageTyping(mess)
                }, 500)
                navigate(`/chat?conId=${res}`)
            }
        })
    }

    return (
        <div className="m-auto p-2 md:p-0">
            <h1 className="text-xl md:text-3xl font-semibold mb-1 w-full md:w-[48rem] m-auto">
                <span className="bg-gradient-to-r from-violet-500 via-yellow-500 to-red-500 text-transparent bg-clip-text">
                    VĂN PHÒNG ỦY BAN NHÂN DÂN THÀNH PHỐ HÀ NỘI
                </span>
            </h1>
            <h1 className="text-xl md:text-3xl font-semibold w-full md:w-[48rem] m-auto">Trợ lý ảo</h1>

            <div className="h-56 w-full md:w-[48rem] m-auto flex-col bg-no-repeat bg-contain bg-[url('/images/bg-home.png')] flex justify-center items-center">
                <div className="h-2" />
                <Button size="lg" className="h-12">D'ASSISTANT</Button>
            </div>

            <div className="grid grid-cols-3 gap-8 w-full md:w-[66rem] mb-16">
                {
                    getListBotQuery.data?.map(bot => (
                        <div
                            className="p-3 cursor-pointer bg-secondary rounded-lg flex items-start"
                            onClick={() => setChatBot(bot)}
                        >
                            <div className="mr-3 w-60 h-20">
                                <h3 className="font-semibold mb-1">{bot.name}</h3>
                                <TypeAnimation
                                    sequence={[
                                        bot.description,
                                        2000,
                                    ]}
                                    cursor
                                    speed={50}
                                    className="text-sm font-light"
                                />
                            </div>
                            <img src={import.meta.env.VITE_API_URL + bot.icon} className="w-12 object-contain" />
                        </div>
                    ))
                }

            </div>

            <MessageInput onSubmit={handleSendMess} />
        </div>
    )
}

export default HomeScreen