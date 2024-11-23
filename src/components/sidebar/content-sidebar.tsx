import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { LogOut, PlusIcon } from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils";
import { useLogoutUser } from "@/redux/hooks/user";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import AccordionBot from "../common/accordion-bot";

function ContentSidebar() {
    const navigate = useNavigate();

    const logOut = useLogoutUser()
    const handleLogout = () => {
        logOut()
        navigate("/login")
    }

    const { open, isMobile } = useSidebar()

    return (
        <>
            <div className={cn("flex justify-end p-4")}>
                <Popover>
                    <PopoverTrigger>
                        <Avatar className="h-10 w-10 md:h-12 md:w-12">
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

            <div className={cn("absolute flex gap-2 top-4", isMobile ? "flex-row" : "flex-col")}>
                {
                    (!open || isMobile) &&
                    <>
                        <TooltipProvider delayDuration={0}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <SidebarTrigger className="border" />
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Mở thanh bên</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider delayDuration={0}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="border"
                                        onClick={() => {

                                        }}
                                    >
                                        <PlusIcon style={{ height: "28px", width: "28px" }} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Cuộc trò chuyện mới</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </>
                }
                <AccordionBot />
            </div>
            <Outlet />
        </>
    )
}

export default ContentSidebar