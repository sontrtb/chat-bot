import MessageInput from "./components/message-input"
import MessageList from "./components/message-list"

function ChatScreen() {
    return (
        <div className="flex flex-col h-[calc(100vh_-_80px)] p-3">
            <MessageList />
            <MessageInput />
        </div>
    )
}

export default ChatScreen