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
// import { useSetChatBot } from "@/redux/hooks/chat-bot";
import { Switch } from "../ui/switch";
import { useSetTheme, useGetCurrentTheme } from "@/redux/hooks/theme";
import Logo from "@/assets/logo/logo.png"
import { LogOut, Moon, PanelRightOpen, Plus, UserRound } from "lucide-react";

export function AppSidebar() {
    const navigate = useNavigate();
    // const setChatBot = useSetChatBot()

    const setTheme = useSetTheme();
    const theme = useGetCurrentTheme()

    const { toggleSidebar } = useSidebar()

    const goHomeScreen = () => {
        // setChatBot({
        //     id: "all",
        //     name: "Tất cả model",
        //     icon: "",
        //     description: "Tất cả model",
        //     model: "all",
        //     service: "all"
        // })
        navigate("/")
    }

    const handleLogout = () => {
        navigate("/login")
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
                            <SidebarMenuButton size="lg">
                                <Moon />
                                Nền tối
                                <Switch
                                    id="airplane-mode"
                                    checked={theme === "dark"}
                                    onCheckedChange={e => {
                                        setTheme(e ? "dark" : "light")
                                    }}
                                />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem >
                            <SidebarMenuButton size="lg">
                                <UserRound />
                                Thông tin tài khoản
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem >
                            <SidebarMenuButton size="lg" onClick={toggleSidebar}>
                                <PanelRightOpen />
                                Đóng thanh bên
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem >
                            <SidebarMenuButton size="lg" onClick={handleLogout}>
                                <LogOut />
                                Đăng xuất
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarFooter>
        </Sidebar>
    )
}
