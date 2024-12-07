import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EModeApp, useGetMode } from "@/hooks/use-get-mode";
import { cn } from "@/lib/utils";
import { Check, Instagram, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";



interface IMessageCameraProps {
    onCapture: (data: string) => void
}

function MessageCamera(props: IMessageCameraProps) {
    const {onCapture} = props

    const mode = useGetMode();
    const isKiosk = mode === EModeApp.KIOSK

    const [currentDeviceId, setCurrentDeviceId] = useState<string | undefined>(undefined);

    useEffect(() => {
        const getDevices = async () => {
          const mediaDevices = await navigator.mediaDevices.enumerateDevices();
          const videoDevices = mediaDevices.filter(device => device.kind === "videoinput");

          if (videoDevices.length === 0) return;

          if(!isKiosk) {
            setCurrentDeviceId(videoDevices[0].deviceId);
          } else {
            const webcamKiosk = videoDevices.find(e => e.label.toLocaleLowerCase().includes("logitech"))
            setCurrentDeviceId(webcamKiosk?.deviceId ?? videoDevices[0].deviceId);
          }
        };
    
        getDevices();
      }, [isKiosk]);

    const webcamRef = useRef<Webcam>(null);

    const [open, setOpen] = useState(false);
    const [countdown, setCountdown] = useState(0)
    const [dataImage, setDataImage] = useState<string | null>()

    const onReset = () => {
        setCountdown(0);
        setDataImage(null)
    }

    useEffect(() => {
        if(!open) onReset()
    }, [open])

    const capture = () => {
        let countdown = 3;
        setCountdown(countdown)

        const interval = setInterval(() => {
            countdown -= 1;
            if (countdown > 0) {
                setCountdown(countdown);
            } else {
                clearInterval(interval);
                setCountdown(4)
                const imageSrc = webcamRef.current?.getScreenshot();
                setDataImage(imageSrc)
            }
        }, 1000);
    }

    const onDone = () => {
        if(dataImage) {
            onCapture(dataImage);
        }
        setOpen(false)
    }

    const renderBtnAction = () => {
        switch (countdown) {
            case 0:
                return (
                    <button
                        onClick={capture}
                        className="cursor-pointer bg-primary/10 p-4 rounded-full hover:scale-110 transition-transform mt-6"
                    >
                        <Instagram size={isKiosk ? "70px" : "35px"} />
                    </button>
                )
            case 1:
            case 2:
            case 3:
                return (
                    <div
                        className="bg-primary/10 p-4 rounded-full hover:scale-110 transition-transform mt-6"
                    >
                        <p className={cn(isKiosk ? "w-[70px]" : "w-[35px]", isKiosk ? "h-[70px]" : "h-[35px]", "text-3xl font-bold text-center")}>{countdown}</p>
                    </div>
                )
            default:
                return (
                    <div>
                        <button
                            onClick={onReset}
                            className="cursor-pointer bg-primary/10 p-4 rounded-full hover:scale-110 transition-transform mt-6"
                        >
                            <X size={isKiosk ? "70px" : "35px"} />
                        </button>
                        <span className="p-4" />
                        <button
                            onClick={onDone}
                            className="cursor-pointer bg-primary/10 p-4 rounded-full hover:scale-110 transition-transform mt-6"
                        >
                            <Check size={isKiosk ? "70px" : "35px"} />
                        </button>
                    </div>
                )


        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild >
                <button
                    className="cursor-pointer mr-2 bg-primary/10 p-2 rounded-full hover:scale-110 transition-transform"
                >
                    <Instagram size={isKiosk ? "40px" : "20px"} />
                </button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogTitle>Chụp ảnh</DialogTitle>
                <div className="flex flex-col items-center mt-2">
                    {
                        dataImage ?
                            <img className="rounded-md w-full" src={dataImage} /> :
                            <Webcam
                                className="rounded-md w-full"
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={{
                                    deviceId: currentDeviceId ?? undefined,
                                }}
                            />
                    }
                    {renderBtnAction()}
                </div>
            </DialogContent>
        </Dialog >
    )
}

export default MessageCamera