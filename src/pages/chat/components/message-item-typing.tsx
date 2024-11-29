import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetCurrentMessageTyping, useSetMessageTypingDone } from "@/redux/hooks/message-typing";
import { useGetUser } from "@/redux/hooks/user";
import { IMessage } from "@/types/message";
import { Dispatch, Fragment, useEffect, useRef, useState } from "react";
import { marked } from "marked"
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCurrentChatBot, useGetListChatBot } from "@/redux/hooks/chat-bot";
import { useSearchParams } from "react-router-dom";

interface IMessageItemTypingProps {
    setListMess: Dispatch<React.SetStateAction<IMessage[]>>
    scrollToBottom: () => void
}

function MessageItemTyping(props: IMessageItemTypingProps) {
    const { setListMess, scrollToBottom } = props

    const [searchParams, setSearchParams] = useSearchParams();
    const conId = searchParams.get("conId")

    const messageTyping = useGetCurrentMessageTyping()
    const setMessageTypingDone = useSetMessageTypingDone()

    const user = useGetUser()

    const botSelect = useGetCurrentChatBot()

    const [isLoading, setIsLoading] = useState(false)
    const [textTmp, setTextTmp] = useState("")

    const listBot = useGetListChatBot()
    const botSend = listBot?.find(bot => bot.id === botSelect?.id)

    const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array>>()

    const getMessage = async (mess?: string) => {
        setIsLoading(true);
        fetch(`${import.meta.env.VITE_API_URL}/c/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                responseType: "stream",
                Authorization: `Bearer ${user?.token}`,
            },
            body: JSON.stringify({
                message: mess,
                conId: conId,
                target: botSelect?.id,
            }),
        })
            .then(async (response) => response.body?.getReader())
            .then((reader) => {
                readerRef.current = reader;
                const decoder = new TextDecoder();
                let textMessTmp = "";
                let incompleteData = ""; // Biến lưu trữ dữ liệu chưa hoàn chỉnh

                function readStream() {
                    reader?.read().then(({ done, value }) => {
                        if (done) {
                            setMessageTypingDone();
                            const newMess: IMessage = {
                                id: new Date().getTime(),
                                message: textMessTmp,
                                userId: botSelect?.id ?? "bot",
                            };
                            setListMess((pre) => [...pre, newMess]);
                            setTextTmp("");

                            if (!conId) {
                                setSearchParams((params) => {
                                    params.set("conId", "new");
                                    return params;
                                });
                            }
                            return;
                        }

                        const chunk = decoder.decode(value, { stream: true });
                        incompleteData += chunk; // Thêm chunk mới vào incompleteData

                        // Xử lý các JSON đầy đủ trong incompleteData
                        const lines = incompleteData.split("\n");
                        incompleteData = lines.pop() || ""; // Lấy phần chưa hoàn chỉnh lưu lại

                        lines.forEach((line) => {
                            if (!line.startsWith("data:")) return; // Chỉ xử lý các dòng bắt đầu với "data:"

                            const jsonData = line.replace("data:", "").trim();
                            try {
                                const parsedData = JSON.parse(jsonData);
                                const message = parsedData.result?.message || "";
                                textMessTmp += message;
                                setTextTmp(`${textMessTmp}`);
                                scrollToBottom();
                            } catch (error) {
                                console.error("Invalid JSON:", error);
                            }
                        });

                        readStream();
                    });
                }

                readStream();
            })
            .catch((error) => {
                setMessageTypingDone();
                console.error("Error sending POST request:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (messageTyping.isTyping) {
            getMessage(messageTyping.message)
        }
    }, [messageTyping])

    // cancel typing
    useEffect(() => {
        readerRef.current?.cancel()
    }, [botSelect])
    useEffect(() => {
        if(!messageTyping.isTyping) {
            readerRef.current?.cancel()
        }
    }, [messageTyping.isTyping])

    if (!messageTyping.isTyping) return <Fragment />

    return (
        <div className={"mb-3 flex justify-start"}>
            <div className="flex">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={import.meta.env.VITE_API_URL + botSend?.icon} alt="Icon AI" />
                    <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                {
                    isLoading ?
                        <Skeleton className="h-8 w-1/2 md:w-96 rounded-md ml-4 mt-2" /> :
                        <article
                            className="bg-secondary/50 prose dark:prose-invert ml-4 pt-1 md:w-fit w-4/5  p-3 shadow-xl rouder rounded-xl border"
                            dangerouslySetInnerHTML={{ __html: marked.parse(textTmp) as string }}
                        />
                }
            </div>
        </div>
    )
}

export default MessageItemTyping

