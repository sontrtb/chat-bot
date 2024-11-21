import MessageInput from "../chat/components/message-input"
import { useNavigate } from "react-router-dom";
import { useSetMessageTyping } from "@/redux/hooks/message-typing";

function HomeScreen() {
    const navigate = useNavigate();
    
    const setMessageTyping = useSetMessageTyping()

    const handleSendMess = (mess: string) => {
        setTimeout(() => {
            setMessageTyping(mess)
        }, 500)
        
        navigate("/chat")
    }

    return (
        <div className="m-auto w-[48rem]">
            <h1 className="text-3xl font-semibold mb-1">Tất cả <span className="bg-gradient-to-r from-violet-500 via-yellow-500 to-red-500 text-transparent bg-clip-text">trí tuệ nhân tạo</span> hàng đầu trên thế giới.</h1>
            <h1 className="text-3xl font-semibold mb-8">Đều ở đây!</h1>
            <MessageInput onSubmit={handleSendMess} showBot={false}/>
        </div>
    )
}

export default HomeScreen