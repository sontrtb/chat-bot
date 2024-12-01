import { useGetCurrentChatBot } from "@/redux/hooks/chat-bot";
import { useGetCurrentMessageTyping, useSetMessageTypingDone } from "@/redux/hooks/message-typing";
import { useGetUser } from "@/redux/hooks/user";
import { ERoleMessage, IMessage } from "@/types/message";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface IUseGetMessageProps {
    onDoneTyping?: (mess: IMessage) => void;
    onTyping?:(messText: string) => void
}

const useGetMessage = (props: IUseGetMessageProps) => {
    const { onDoneTyping, onTyping} = props

    const setMessageTypingDone = useSetMessageTypingDone()

    const user = useGetUser()

    const [searchParams, setSearchParams] = useSearchParams();
    const conId = searchParams.get("conId")

    const messageTyping = useGetCurrentMessageTyping()

    const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array>>()

    const botSelect = useGetCurrentChatBot()
    
    const [isLoading, setIsLoading] = useState(false)

    const getMessage = async (messageSend?: string, target?: string) => {
        let replyToId = ""
        setIsLoading(true);
        fetch(`${import.meta.env.VITE_API_URL}/c/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                responseType: "stream",
                Authorization: `Bearer ${user?.token}`,
            },
            body: JSON.stringify({
                message: messageSend,
                conId: conId,
                target: target,
            }),
        })
            .then(async (response) => response.body?.getReader())
            .then((reader) => {
                readerRef.current = reader;
                const decoder = new TextDecoder();
                let textMessTmp = "";
                let incompleteData = "";

                function readStream() {
                    reader?.read().then(({ done, value }) => {
                        if (done) {
                            setMessageTypingDone();
                            const newMess: IMessage = {
                                id: new Date().getTime(),
                                message: textMessTmp,
                                userId: target ?? botSelect?.id ?? "bot",
                                messageId: `${new Date().getTime()}`,
                                role: ERoleMessage.ASSISTANT,
                                replyToId: replyToId
                            };
                            onDoneTyping?.(newMess)

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
                                replyToId =  parsedData.result?.replyToId
                                textMessTmp += message;
                                onTyping?.(`${textMessTmp}`);
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
    }

    useEffect(() => {
        readerRef.current?.cancel()
    }, [botSelect])
    useEffect(() => {
        if(!messageTyping.isTyping) {
            readerRef.current?.cancel()
        }
    }, [messageTyping.isTyping])

    return {
        getMessage: getMessage,
        isLoading: isLoading,
    }
};

export default useGetMessage