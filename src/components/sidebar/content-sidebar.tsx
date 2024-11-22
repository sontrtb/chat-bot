import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { LogOut } from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils";

function ContentSidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/login")
    }

    const { open, isMobile } = useSidebar()

    return (
        <>
            <div className={cn("flex justify-end p-4", (!open || isMobile) && "justify-between")}>
                {
                    (!open || isMobile ) && <SidebarTrigger className="ml-10" />
                }
                <Popover>
                    <PopoverTrigger>
                        <Avatar className="h-12 w-12">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </PopoverTrigger>

                    <PopoverContent className="w-60 p-0">
                        <div className="flex items-center hover:bg-neutral-100 p-2 rounded" onClick={handleLogout}>
                            <LogOut />
                            <p className="ml-2 text-sm">Đăng xuất</p>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            <Outlet />
        </>
    )
}

export default ContentSidebar