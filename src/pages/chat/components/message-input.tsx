import { cn } from "@/lib/utils";
import { useGetCurrentChatBot } from "@/redux/hooks/chat-bot";
import { useGetCurrentMessageTyping, useSetMessageTypingDone } from "@/redux/hooks/message-typing";
import { fileToBase64 } from "@/utils/base64";
import { CirclePause, CircleX, CloudUpload, Send } from "lucide-react"
import { useEffect, useId, useRef, useState } from "react";

export interface IDataSubmitInput {
    message: string;
    fileName?: string;
    fileData?: string;
}

interface IMessageInputProps {
    onSubmit?: (mess: IDataSubmitInput) => void;
    autoFocus?: boolean;
}

function MessageInput(props: IMessageInputProps) {
    const { onSubmit, autoFocus } = props;

    const idInputFile = useId()

    const inputRef = useRef<HTMLTextAreaElement>(null)

    const messageTyping = useGetCurrentMessageTyping()
    const setMessageTypingDone = useSetMessageTypingDone()

    const botSelect = useGetCurrentChatBot()

    const [text, setText] = useState("")
    const [fileInfor, setFileInfor] = useState<{
        fileName: string;
        fileData: string;
    }>()
    const [isChangeBotDone, setIsChangeBotDone] = useState(false)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    }, [text]);

    useEffect(() => {
        if (!messageTyping.isTyping) {
            inputRef.current?.focus()
            setIsChangeBotDone(true)
            setTimeout(() => {
                setIsChangeBotDone(false)
            }, 300)
        }
    }, [messageTyping.isTyping, botSelect])

    const handleSubmit = () => {
        if (messageTyping.isTyping || text.length === 0) return;
        onSubmit?.({
            message: text,
            fileName: fileInfor?.fileName,
            fileData: fileInfor?.fileData
        })
        setText("")
        onClearFile()
    }

    const handleCancel = () => {
        setMessageTypingDone()
    }

    const onUpfile = async (file: File) => {
        const base64 = await fileToBase64(file)
        if (base64) {
            setFileInfor({
                fileName: file.name,
                fileData: base64 as string
            })
        }
    }

    const onClearFile = () => {
        setFileInfor(undefined)
    }

    // const onListen = () => {
    //
    // }

    return (
        <div className={
            cn(
                "bg-secondary rounded-xl py-2 xl:py-3 w-full  max-w-3xl mx-auto px-1 xl:px-2 transition-transform duration-300 transform",
                isChangeBotDone ? "scale-105" : ""
            )}>
            <textarea
                ref={inputRef}
                autoFocus={autoFocus}
                disabled={messageTyping.isTyping}
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => {
                    if (e.shiftKey && e.key === "Enter") {
                        e.preventDefault();
                        setText((prevText) => prevText + "\n");
                        return
                    }
                    if (e.key === 'Enter') {
                        handleSubmit()
                    }
                }}
                style={{ resize: "none", maxHeight: "300px" }}
                className="outline-none bg-secondary w-full flex-1 px-4 font-light"
                placeholder="Hãy hỏi tôi..."
            />
            {
                fileInfor &&
                <div className="px-2 py-1 rounded bg-primary/10 opacity-50 w-fit my-3 flex items-center">
                    <p className="text-sm mr-2">{fileInfor?.fileName}</p>
                    <CircleX size="18px" onClick={onClearFile} className="cursor-pointer" />
                </div>
            }
            <div className="flex justify-between">
                <img src={import.meta.env.VITE_API_URL + botSelect?.icon} className="w-8 h-8 ml-2" />
                <div className="flex">
                    {/*<button*/}
                    {/*    onClick={onListen}*/}
                    {/*    className="cursor-pointer mr-2 bg-primary/10 p-2 rounded-full hover:scale-110 transition-transform"*/}
                    {/*>*/}
                    {/*    <Mic size="20px" className="text-primary"/>*/}
                    {/*</button>*/}

                    <>
                        <label
                            htmlFor={idInputFile}
                            className="cursor-pointer mr-2 bg-primary/10 p-2 rounded-full hover:scale-110 transition-transform"
                        >
                            <CloudUpload size="20px" className="text-primary" />
                        </label>
                        <input
                            type="file"
                            className="hidden"
                            id={idInputFile}
                            onChange={e => {
                                const file = e.target.files?.[0]
                                if (file) {
                                    onUpfile(file)
                                }
                            }}
                        />
                    </>

                    {messageTyping.isTyping ?
                        <button className="cursor-pointer mr-3 bg-primary/10 p-2 rounded-full hover:scale-110 transition-transform" onClick={handleCancel}>
                            <CirclePause size="20px" className="text-primary" />
                        </button> :
                        <button className="cursor-pointer mr-3 bg-primary/10 p-2 rounded-full hover:scale-110 transition-transform" onClick={handleSubmit}>
                            <Send size="20px" className="text-primary" />
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default MessageInput