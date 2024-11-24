import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import HistoryChat from "../sidebar/history-chat"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/logo/logo.png"
import { PanelRightOpen, Plus } from "lucide-react";

export function AppSidebar() {
    const navigate = useNavigate();

    const { toggleSidebar } = useSidebar()

    const goHomeScreen = () => {
        navigate("/")
    }

    return (
        <Sidebar>
            <SidebarHeader>
                <img src={Logo} className="w-24 m-auto mt-6 brightness-200" />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <HistoryChat />
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarGroup >
                    <Button variant="secondary" size="lg" onClick={goHomeScreen}>
                        <Plus />
                        Cuộc trò chuyện mới
                    </Button>
                </SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem >
                            <SidebarMenuButton size="lg" onClick={toggleSidebar}>
                                <PanelRightOpen />
                                Đóng thanh bên
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarFooter>
        </Sidebar>
    )
}
