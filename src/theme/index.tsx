import { EModeApp, useGetMode } from "@/hooks/use-get-mode";
import { useGetCurrentTheme } from "@/redux/hooks/theme"
import { ReactNode, useEffect } from "react"

function Theme({children}: {children: ReactNode}) {

    const theme = useGetCurrentTheme()
    const mode = useGetMode();

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove("light", "dark", EModeApp.DEFAULT, EModeApp.KIOSK)
        root.classList.add(theme)
        root.classList.add(mode)
      }, [theme, mode])
      
    return (
        <div>
            {children}
        </div>
    )
}

export default Theme