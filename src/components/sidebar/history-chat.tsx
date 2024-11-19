import { useNavigate } from "react-router-dom";
import { SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"

function HistoryChat() {
    const navigate = useNavigate();

    const list = [1, 2, 3, 4, 5, 6]

    
    const goChatScreen = () => {
        navigate("/chat/123")
    }

    return (
        <div>
            <SidebarGroupLabel>Lịch sử trò chuyện</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {list.map((item, index) => (
                        <SidebarMenuItem key={index}>
                            <SidebarMenuButton onClick={goChatScreen}>
                                <span>{"Hello chat"}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </div>
    )
}

export default HistoryChat