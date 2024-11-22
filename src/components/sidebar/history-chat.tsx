import { useNavigate } from "react-router-dom";
import { SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { Separator } from "../ui/separator";

function HistoryChat() {
    const navigate = useNavigate();

    const list = ["Lựa chọn biểu đồ phù hợp", "Total Sale là gì?", "Chi phí sử dụng ElasticSearch", "Quy đổi thời gian"]

    const goChatScreen = () => {
        navigate("/chat/123")
    }

    return (
        <div className="mt-3">
            <SidebarGroupLabel>
                Lịch sử hội thoại
                <Separator className="w-24 ml-3 mt-1" />
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {list.map((item) => (
                        <SidebarMenuItem key={item} className="my-1">
                            <SidebarMenuButton onClick={goChatScreen}>
                                <span className="text-xs">{item}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </div>
    )
}

export default HistoryChat