import { ReactNode, useEffect } from "react"

function Theme({children}: {children: ReactNode}) {

    useEffect(() => {
        const root = window.document.documentElement
     
        root.classList.remove("light", "dark")
     
        // if (theme === "system") {
        //   const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        //     .matches
        //     ? "dark"
        //     : "light"
     
        //   root.classList.add(systemTheme)
        //   return
        // }
     
        root.classList.add("light")
      }, [])
      
    return (
        <div>
            {children}
        </div>
    )
}

export default Theme