import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import HistoryChat from "../sidebar/history-chat"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom";
import { useSetChatBot } from "@/redux/hooks/chat-bot";

export function AppSidebar() {
    const navigate = useNavigate();
    const setChatBot = useSetChatBot()
    
    const goHomeScreen = () => {
        setChatBot(undefined)
        navigate("/")
    }

    return (
        <Sidebar variant="floating">
            <SidebarHeader>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup >
                    <Button variant="outline" onClick={goHomeScreen}>Tạo mới</Button>
                </SidebarGroup>
                <SidebarGroup>
                    <HistoryChat />
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
