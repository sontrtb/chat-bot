import { EModeApp, useGetMode } from "@/hooks/use-get-mode";
import { ReactElement, useCallback, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";

const TIME_OUT = 120000

interface IBackgroundServiceProps {
    children: ReactElement
}

function BackgroundService(props: IBackgroundServiceProps) {
    const {children} = props

    const navigate = useNavigate();

    const mode = useGetMode();
    const isKiosk = mode === EModeApp.KIOSK 

    // disable right click
    const onContextmenu = (event: MouseEvent) => {
        event.preventDefault()
    }

    useEffect(() => {
        if(isKiosk) {
            document.addEventListener('contextmenu', onContextmenu);
        }
        return () => document.removeEventListener('contextmenu', onContextmenu);
    }, [isKiosk])

    // auto logout kiosk
    const logOutGuest = useCallback(() => {
        navigate("/login")
    }, [navigate])

    const timeOutLogout = useRef<NodeJS.Timeout>()
    const onClick = useCallback(() => {
        clearTimeout(timeOutLogout.current)
        timeOutLogout.current = setTimeout(logOutGuest, TIME_OUT)
    }, [logOutGuest])

    useEffect(() => {
        if(isKiosk) {
            timeOutLogout.current = setTimeout(logOutGuest, TIME_OUT)
            document.addEventListener('click', onClick);
        }

        return () => {
            document.removeEventListener('click', onClick)
            clearTimeout(timeOutLogout.current)
        }
    }, [isKiosk, logOutGuest, onClick])

    return (
        <div>
            {children}
        </div>
    )
}

export default BackgroundService