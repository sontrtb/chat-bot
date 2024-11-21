import { useGetCurrentTheme } from "@/redux/hooks/theme"
import { ReactNode, useEffect } from "react"

function Theme({children}: {children: ReactNode}) {

    const theme = useGetCurrentTheme()

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove("light", "dark")
        root.classList.add(theme)
      }, [theme])
      
    return (
        <div>
            {children}
        </div>
    )
}

export default Theme