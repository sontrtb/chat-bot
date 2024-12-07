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
    }, [])

    return (
        <div className="relative w-full">
            <img 
                style={{height: sizeContent.height + 190}}
            className={cn("w-full")} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEBrYHQg_26rGBqEvRgk9N9mVNso-e6SsgVtIYoh-M9oPcadq3YlRu6lJkLWs9i_MT9I8&usqp=CAU" />
            <div className="absolute w-full h-full bottom-0 flex items-center justify-center">
                <div className="w-7/12" ref={ref} style={{fontFamily: "cursive"}}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default TempVerse