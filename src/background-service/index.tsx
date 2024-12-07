import { EModeApp, useGetMode } from "@/hooks/use-get-mode";
import { ReactElement, useCallback, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";

const TIME_OUT = 120000

interface IBackgroundServiceProps {
    children: ReactElement
}

function BackgroundService(props: IBackgroundServiceProps) {
    const { children } = props

    const navigate = useNavigate();

    const mode = useGetMode();
    const isKiosk = mode === EModeApp.KIOSK

    // disable zoom
    const onWheelHandler = (event: WheelEvent) => {
        event.preventDefault();
    }
    useEffect(() => {
        if (isKiosk) {
            window.addEventListener("wheel", onWheelHandler, false);
        }
        return () => window.removeEventListener('wheel', onWheelHandler);
    }, [isKiosk])

    // disable right click
    const onContextmenu = (event: MouseEvent) => {
        event.preventDefault()
    }

    useEffect(() => {
        if (isKiosk) {
            document.addEventListener('contextmenu', onContextmenu);
        }
        return () => document.removeEventListener('contextmenu', onContextmenu);
    }, [isKiosk])

    // auto go home kiosk
    const logOut = useCallback(() => {
        navigate("/login")
    }, [navigate])

    const timeOutLogout = useRef<NodeJS.Timeout>()
    const onClick = useCallback(() => {
        clearTimeout(timeOutLogout.current)
        timeOutLogout.current = setTimeout(logOut, TIME_OUT)
    }, [logOut])

    useEffect(() => {
        if (isKiosk) {
            timeOutLogout.current = setTimeout(logOut, TIME_OUT)
            document.addEventListener('click', onClick);
        }

        return () => {
            document.removeEventListener('click', onClick)
            clearTimeout(timeOutLogout.current)
        }
    }, [isKiosk, logOut, onClick])

    return (
        <div>
            {children}
        </div>
    )
}

export default BackgroundService