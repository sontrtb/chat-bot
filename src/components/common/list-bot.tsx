import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"

interface IListBotProps {
    mode?: "mini" | "full"
    className?: string
}

function ListBot(props: IListBotProps) {
    const {mode = "mini", className} = props

    const isMini = mode === "mini"

    const list = [1, 2, 3, 4, 5, 6]

    const navigate = useNavigate();
    
    const goChatScreen = () => {
        navigate("/chat")
    }

    return (
        <div className={cn("grid", isMini ? "gap-4 grid-cols-2" : "gap-6 grid-cols-3",className)}>
            {
                list.map((bot, index) => (
                    <div
                        key={index}
                        onClick={goChatScreen}
                        className={cn("p-3 flex rounded-md hover:bg-neutral-100 col-span-1 cursor-pointer", isMini ? "" : "justify-center")}
                    >
                        <img className="rounded-full h-10 w-10 mr-3" src="https://chatgpt.com/backend-api/content?id=file-SxYQO0Fq1ZkPagkFtg67DRVb&gizmo_id=g-2fkFE8rbu&ts=481116&p=gpp&sig=d6dccdbc96953037667f4f4f5e12e2a02e0e71132847d746ad83f4a0982d3ccc&v=0"/>
                        <div>
                            <p className="text-sm font-semibold">GPT</p>
                            <p className="text-xs text-neutral-400">By Google</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ListBot