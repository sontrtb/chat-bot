import { useNavigate } from "react-router-dom";
import { SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { Separator } from "../ui/separator";
import { useQuery } from "@tanstack/react-query";
import queryKey from "@/const/query-key";
import { getHistory } from "@/api/chat";

function HistoryChat() {
    const navigate = useNavigate();

    const goChatScreen = (id: string) => {
        navigate(`/chat?conId=${id}`)
    }

    const getHistoryQuery = useQuery({
        queryKey: [queryKey.getHistory],
        queryFn: getHistory
    })

    return (
        <div className="mt-3">
            <SidebarGroupLabel>
                Lịch sử hội thoại
                <Separator className="w-24 ml-3 mt-1" />
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {getHistoryQuery.data?.reverse().map((item) => (
                        <SidebarMenuItem key={item.id} className="my-1">
                            <SidebarMenuButton onClick={() => goChatScreen(item.id)}>
                                <span>{item.summary}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </div>
    )
}

export default HistoryChat