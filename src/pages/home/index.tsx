import MessageInput, { IDataSubmitInput } from "../chat/components/message-input"
import { useNavigate } from "react-router-dom";
import { useSetMessageTyping } from "@/redux/hooks/message-typing";
import { Button } from "@/components/ui/button";
import { TypeAnimation } from 'react-type-animation';
import { useMutation, useQuery } from "@tanstack/react-query";
import { createNewChat } from "@/api/chat";
import queryKey from "@/const/query-key";
import { getListBot } from "@/api/bot";
import { useSetChatBot } from "@/redux/hooks/chat-bot";
import { ERoleMessage, IMessage } from "@/types/message";
import { useGetUser } from "@/redux/hooks/user";
import { IBot } from "@/types/chatbot";
import { EModeApp, useGetMode } from "@/hooks/use-get-mode";
import BackgroundParticles from "@/components/common/background-particles";
function HomeScreen() {
    const navigate = useNavigate();

    const setMessageTyping = useSetMessageTyping()
    const setChatBot = useSetChatBot()
    const user = useGetUser()

    const mode = useGetMode();
    const isKiosk = mode === EModeApp.KIOSK

    const createChatMutation = useMutation({
        mutationFn: createNewChat
    })

    const getListBotQuery = useQuery({
        queryKey: [queryKey.getListBot],
        queryFn: getListBot
    })

    const handleSendMess = (messSend: IDataSubmitInput) => {
        const newMess: IMessage = {
            id: -1,
            message: messSend.message,
            userId: user?.id ?? "me",
            messageId: "-1",
            role: ERoleMessage.USER,
        }
        createChatMutation.mutate(undefined, {
            onSuccess: (res) => {
                setTimeout(() => {
                    setMessageTyping({
                        message: messSend.message,
                        fileName: messSend.fileName,
                        fileData: messSend.fileData,
                        messageId: newMess.messageId
                    })
                }, 500)
                navigate(`/chat?conId=${res}`, {
                    state: newMess
                })
            }
        })
    }

    const changeChatBot = (bot: IBot) => {
        setChatBot(bot)

    }

    return (
        <BackgroundParticles className="m-auto p-3 xl:p-0 z-10">
            <>
                <h1 className="text-xl xl:text-3xl font-semibold mb-1 w-full xl:w-[48rem] m-auto text-center">
                    {isKiosk ? "TRỢ LÝ ẢO TƯƠNG TÁC CÙNG BẠN" : "VĂN PHÒNG ỦY BAN NHÂN DÂN THÀNH PHỐ HÀ NỘI"}
                </h1>
                <h1 className="text-xl xl:text-3xl font-semibold w-full xl:w-[48rem] m-auto mb-8 xl:mb-0 text-center">
                    <span className="bg-gradient-to-r from-violet-500 via-yellow-500 to-red-500 text-transparent bg-clip-text">
                        {isKiosk ? "Tôi có thể giúp gì cho bạn?" : "HANOI VIRTUAL ASSISTANT"}
                    </span>
                </h1>

                <div className="hidden xl:flex h-56 w-full xl:w-[48rem] m-auto flex-col bg-no-repeat bg-contain bg-[url('/images/bg-home.png')] justify-center items-center">
                    <div className="h-2" />
                    <Button size="lg" className="h-12">D'ASSISTANT</Button>
                </div>

                <MessageInput onSubmit={handleSendMess} />

                <div className="grid-cols-3 gap-3 xl:gap-8 w-full xl:w-[66rem] grid mt-8 xl:m-16">
                    {
                        getListBotQuery.data?.map(bot => (
                            <div
                                key={bot.id}
                                className="justify-end p-3 cursor-pointer bg-secondary rounded-lg flex xl:flex-row flex-col-reverse xl:items-start hover:shadow items-center hover:scale-105 transition-transform duration-300 transform"
                                onClick={() => changeChatBot(bot)}
                            >
                                <div className="xl:mr-3 xl:w-60 xl:h-20">
                                    <h3 className="text-center xl:text-left xl:font-normal xl:font-semibold mt-2 xl:mt-0">{bot.name}</h3>
                                    <TypeAnimation
                                        sequence={[
                                            bot.description,
                                            2000,
                                        ]}
                                        cursor={false}
                                        speed={50}
                                        className="hidden xl:block text-sm font-light"
                                    />
                                </div>
                                <img src={import.meta.env.VITE_API_URL + bot.icon} className="h-8 xl:h-auto xl:w-12 object-contain" />
                            </div>
                        ))
                    }
                </div>
            </>
        </BackgroundParticles>
    )
}

export default HomeScreen