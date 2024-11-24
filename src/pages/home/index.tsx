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
import { IMessage } from "@/types/message";
import { useGetUser } from "@/redux/hooks/user";

function HomeScreen() {
    const navigate = useNavigate();

    const setMessageTyping = useSetMessageTyping()
    const setChatBot = useSetChatBot()

    const user = useGetUser()

    const createChatMutation = useMutation({
        mutationFn: createNewChat
    })

    const getListBotQuery = useQuery({
        queryKey: [queryKey.getListBot],
        queryFn: getListBot
    })

    const handleSendMess = (mess: string) => {
        const newMess: IMessage= {
            id: -1,
            message: mess,
            userId: user?.id ?? "me"
        }
        createChatMutation.mutate(undefined, {
            onSuccess: (res) => {
                setTimeout(() => {
                    setMessageTyping(mess)
                }, 500)
                navigate(`/chat?conId=${res}`, {
                    state: newMess
                })
            }
        })
    }

    return (
        <div className="m-auto p-2 md:p-0">
            <h1 className="text-xl md:text-3xl font-semibold mb-1 w-full md:w-[48rem] m-auto">
                VĂN PHÒNG ỦY BAN NHÂN DÂN THÀNH PHỐ HÀ NỘI
            </h1>
            <h1 className="text-xl md:text-3xl font-semibold w-full md:w-[48rem] m-auto mb-8 md:mb-0">
                <span className="bg-gradient-to-r from-violet-500 via-yellow-500 to-red-500 text-transparent bg-clip-text">
                    Chọn AI để bắt đầu hội thoại
                </span>
            </h1>

            <div className="hidden md:flex h-56 w-full md:w-[48rem] m-auto flex-col bg-no-repeat bg-contain bg-[url('/images/bg-home.png')] justify-center items-center">
                <div className="h-2" />
                <Button size="lg" className="h-12">D'ASSISTANT</Button>
            </div>

            <div className="grid-cols-3 gap-3 md:gap-8 w-full md:w-[66rem] grid mb-8 md:mb-16">
                {
                    getListBotQuery.data?.map(bot => (
                            <div
                                className="justify-end p-3 cursor-pointer bg-secondary rounded-lg flex md:flex-row flex-col-reverse md:items-start hover:shadow items-center hover:scale-105 transition-transform duration-300 transform"
                                onClick={() => setChatBot(bot)}
                            >
                                <div className="md:mr-3 md:w-60 md:h-20">
                                    <h3 className="text-center md:text-left md:font-normal md:font-semibold mt-2 md:mt-0">{bot.name}</h3>
                                    <TypeAnimation
                                        sequence={[
                                            bot.description,
                                            2000,
                                        ]}
                                        cursor
                                        speed={50}
                                        className="hidden md:block text-sm font-light"
                                    />
                                </div>
                                <img src={import.meta.env.VITE_API_URL + bot.icon} className="w-1/3 md:w-12 object-contain" />
                            </div>
                    ))
                }
            </div>

            <MessageInput onSubmit={handleSendMess} />
        </div>
    )
}

export default HomeScreen