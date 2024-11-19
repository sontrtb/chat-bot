import { Send } from "lucide-react"

function MessageInput() {
    return (
        <div className="bg-neutral-100 rounded-full flex py-1 w-full h-fit">
            <input className="outline-none bg-neutral-100 flex-1 px-4 font-light rounded-full"
                placeholder="Nhập tin nhắn..."
            />
            <button className="cursor-pointer p-2 bg-neutral-200 mr-1 rounded-full">
                <Send size="20px" className=""/>
            </button>
        </div>
    )
}

export default MessageInput