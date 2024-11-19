import ListBot from "@/components/common/list-bot"
import MessageInput from "../chat/components/message-input"
import { useNavigate } from "react-router-dom";

function HomeScreen() {
    const navigate = useNavigate();

    const handleSendMess = (mess: string) => {
        console.log("mess", mess)
        navigate("/chat")
    }

    return (
        <div className="m-auto w-[640px]">
            <h1 className="text-center text-3xl font-semibold mb-8">What can I help with?</h1>
            <MessageInput onSubmit={handleSendMess}/>
            <ListBot mode="full" className="mt-8"/>
        </div>
    )
}

export default HomeScreen