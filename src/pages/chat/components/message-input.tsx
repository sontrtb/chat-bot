import { EModeApp, useGetMode } from "@/hooks/use-get-mode";
import { cn } from "@/lib/utils";
import { useGetCurrentChatBot } from "@/redux/hooks/chat-bot";
import { useGetCurrentMessageTyping, useSetMessageTypingDone } from "@/redux/hooks/message-typing";
import { fileToBase64 } from "@/utils/base64";
import { CirclePause, CircleX, CloudUpload, LoaderCircle, Mic, Pause, Send } from "lucide-react"
import { useEffect, useId, useRef, useState } from "react";
import { useWavesurfer } from '@wavesurfer/react'
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js'
import { useMutation } from "@tanstack/react-query";
import { voiceToText } from "@/api/tran";

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

    const mode = useGetMode();
    const isKiosk = mode === EModeApp.KIOSK

    const idInputFile = useId()

    const inputRef = useRef<HTMLTextAreaElement>(null)
    const audioRecordRef = useRef(null)

    const messageTyping = useGetCurrentMessageTyping()
    const setMessageTypingDone = useSetMessageTypingDone()

    const botSelect = useGetCurrentChatBot()

    const [text, setText] = useState("")
    const [fileInfor, setFileInfor] = useState<{
        fileName: string;
        fileData: string;
    }>()
    const [isChangeBotDone, setIsChangeBotDone] = useState(false)
    const [isRecording, setIsRecording] = useState(false)

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

    // audio
    const voiceToTextMutation = useMutation({
        mutationFn: voiceToText,
        onSuccess: (res) => {
            setText(res)
        }
    })
    const { wavesurfer } = useWavesurfer({
        container: audioRecordRef,
        waveColor: '#0068b4',
        barWidth: isKiosk ? 10 : 5,
        barRadius: isKiosk ? 10 : 5,
        barHeight: isKiosk ? 6 : 3,
        height: isKiosk ? 60 : 30,
    })

    const record = useRef<RecordPlugin>()

    useEffect(() => {
        record.current = wavesurfer?.registerPlugin(
            RecordPlugin.create({
                renderRecordedAudio: false,
                scrollingWaveform: true,
                scrollingWaveformWindow: 5
            }),
        )

        record.current?.on('record-end', async (blob) => {
            const base64 = await fileToBase64(blob)
            voiceToTextMutation.mutate({
                fileName: "record.webm",
                fileData: base64 as string
            })
        })
    }, [wavesurfer])


    function startRecord() {
        if (record.current?.isRecording()) {
            console.log('stop recording')
            record.current.stopRecording()
            setIsRecording(false)
            return
        }

        record.current?.startRecording().then(() => {
            console.log('recording')
            setIsRecording(true)
        })
    }
    // audio end

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
                placeholder={mode !== EModeApp.KIOSK ? "Hãy hỏi tôi..." : "Bạn tên là gì thế?"}
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

                <div ref={audioRecordRef} className={cn("flex-1 px-4", !isRecording && "hidden")} />

                <div className="flex">
                    <button
                        disabled={voiceToTextMutation.isPending}
                        onClick={startRecord}
                        className="cursor-pointer mr-2 bg-primary/10 p-2 rounded-full hover:scale-110 transition-transform"
                    >
                        {voiceToTextMutation.isPending ?
                            <LoaderCircle size={isKiosk ? "40px" : "20px"} className="text-primary animate-spin" /> :
                            (isRecording ?
                                <Pause size={isKiosk ? "40px" : "20px"} className="text-primary" /> :
                                <Mic size={isKiosk ? "40px" : "20px"} className="text-primary" />)
                        }
                    </button>

                    {
                        !isKiosk &&
                        <>
                            <label
                                htmlFor={idInputFile}
                                className="cursor-pointer mr-2 bg-primary/10 p-2 rounded-full hover:scale-110 transition-transform"
                            >
                                <CloudUpload size={isKiosk ? "40px" : "20px"} className="text-primary" />
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
                    }

                    {messageTyping.isTyping ?
                        <button className="cursor-pointer mr-3 bg-primary/10 p-2 rounded-full hover:scale-110 transition-transform" onClick={handleCancel}>
                            <CirclePause size={isKiosk ? "40px" : "20px"} className="text-primary" />
                        </button> :
                        <button className="cursor-pointer mr-3 bg-primary/10 p-2 rounded-full hover:scale-110 transition-transform" onClick={handleSubmit}>
                            <Send size={isKiosk ? "40px" : "20px"} className="text-primary" />
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default MessageInput