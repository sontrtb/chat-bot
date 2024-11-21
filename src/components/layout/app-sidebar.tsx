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
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useSetTheme, useGetCurrentTheme } from "@/redux/hooks/theme";

export function AppSidebar() {
    const navigate = useNavigate();
    const setChatBot = useSetChatBot()

    const setTheme = useSetTheme();
    const theme = useGetCurrentTheme()

    const goHomeScreen = () => {
        setChatBot(undefined)
        navigate("/")
    }

    return (
        <Sidebar variant="floating" >
            <SidebarHeader>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup >
                    <Button variant="outline" onClick={goHomeScreen}>Tạo mới</Button>
                </SidebarGroup>
                <SidebarGroup>
                    <HistoryChat />

                    <div className="flex items-center space-x-2">
                        <Switch
                            id="airplane-mode"
                            checked={theme === "dark"}
                            onCheckedChange = {e => {
                                setTheme(e ? "dark" : "light")
                            }}
                        />
                        <Label htmlFor="airplane-mode">Chế độ tối</Label>
                    </div>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
