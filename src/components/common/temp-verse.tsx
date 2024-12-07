import { cn } from "@/lib/utils"
import { ReactElement, useEffect, useRef, useState } from "react"

interface ITempVerseProp {
    children: ReactElement
}

function TempVerse(props: ITempVerseProp) {
    const { children } = props

    const [sizeContent, setSizeContent] = useState({
        height: 0,
        width: 0
    })

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setSizeContent({
            height: ref.current?.clientHeight ?? 0,
            width: ref.current?.clientWidth ?? 0
        })
    }, [children])

    return (
        <div className="relative w-full max-w-2xl">
            <img
                style={{ height: sizeContent.height + 190 }}
                className={cn("w-full")} src="/images/temp-verse.png" />
            <div className="absolute w-full h-full bottom-0 flex items-center justify-center">
                <div className="max-w-xl" ref={ref} style={{ fontFamily: "cursive" }}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default TempVerse