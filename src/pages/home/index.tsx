import ListBot from "@/components/common/list-bot"
import MessageInput from "../chat/components/message-input"

function HomeScreen() {
    return (
        <div className="m-auto w-[640px]">
            <h1 className="text-center text-3xl font-semibold mb-8">What can I help with?</h1>
            <MessageInput />
            <ListBot mode="full" className="mt-8"/>
        </div>
    )
}

export default HomeScreen