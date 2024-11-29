import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { LogOut, Moon, PlusIcon, SquareArrowOutUpRight, UserRound } from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils";
import { useLogoutUser } from "@/redux/hooks/user";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import AccordionBot from "../common/accordion-bot";
import { useGetCurrentTheme, useSetTheme } from "@/redux/hooks/theme";
import { Switch } from "../ui/switch";

function ContentSidebar() {
    const navigate = useNavigate();

    const setTheme = useSetTheme();
    const theme = useGetCurrentTheme()

    const logOut = useLogoutUser()
    const handleLogout = () => {
        logOut()
        navigate("/login")
    }

    const { open, isMobile } = useSidebar()

    return (
        <>
            <div className="flex justify-end p-4">
                <Popover>
                    <PopoverTrigger>
                        <Avatar className="h-10 w-10 md:h-12 md:w-12">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </PopoverTrigger>

                    <PopoverContent className="w-60 p-0 mr-4">
                        <div className="flex items-center hover:bg-secondary p-3 rounded cursor-pointer" >
                            <UserRound size={20} />
                            <p className="ml-2 text-sm font-light">Thông tin tài khoản</p>
                        </div>
                        <div className="flex items-center hover:bg-secondary p-3 rounded cursor-pointer">
                            <Moon size={20} />
                            <p className="mx-2 text-sm font-light">Nền tối</p>
                            <Switch
                                className="z-10"
                                checked={theme === "dark"}
                                onCheckedChange={e => {
                                    setTheme(e ? "dark" : "light")
                                }}
                            />
                        </div>
                        <div className="flex items-center hover:bg-secondary p-3 rounded cursor-pointer" onClick={() => { }}>
                            <SquareArrowOutUpRight size={20} />
                            <p className="ml-2 text-sm font-light">Hỗ trợ</p>
                        </div>
                        <div className="border" />
                        <div className="flex items-center hover:bg-secondary p-3 rounded cursor-pointer" onClick={handleLogout}>
                            <LogOut size={20} />
                            <p className="ml-2 text-sm font-light">Đăng xuất</p>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            <div className={cn("absolute flex gap-2 top-4 z-10", isMobile ? "flex-row" : "flex-col")}>
                {
                    (!open || isMobile) &&
                    <div className="pl-2 md:fixed md:bottom-4 flex md:flex-col gap-2 md:left-4">
                        <TooltipProvider delayDuration={0}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="border"
                                        onClick={() => {
                                            navigate("/")
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
                    </div>
                }
                <AccordionBot />
            </div>

            <Outlet />
        </>
    )
}

export default ContentSidebar