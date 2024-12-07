import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Instagram, LogOut, Moon, PlusIcon, SquareArrowOutUpRight } from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils";
import { useLogoutUser } from "@/redux/hooks/user";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import AccordionBot from "../common/accordion-bot";
import { useGetCurrentTheme, useSetTheme } from "@/redux/hooks/theme";
import { Switch } from "../ui/switch";
import { EModeApp, useGetMode } from "@/hooks/use-get-mode";

function ContentSidebar() {
    const navigate = useNavigate();

    const mode = useGetMode();
    const isKiosk = mode === EModeApp.KIOSK

    const setTheme = useSetTheme();
    const theme = useGetCurrentTheme()

    const logOut = useLogoutUser()
    const handleLogout = () => {
        logOut()
        navigate("/login")
    }

    const { open, isMobile } = useSidebar()

    const renderChangeDarkMode = () => {
        return (
            <div className="flex items-center hover:bg-secondary p-3 rounded cursor-pointer">
                <Moon size={isKiosk ? "40px" : "20px"} />
                <p className="mx-2 text-sm font-light">Nền tối</p>
                <Switch
                    className="z-10"
                    checked={theme === "dark"}
                    onCheckedChange={e => {
                        setTheme(e ? "dark" : "light")
                    }}
                />
            </div>
        )
    }

    return (
        <>
            <div className="flex justify-end p-4 z-10">
                {
                    isKiosk ?
                        renderChangeDarkMode() :
                        <Popover>
                            <PopoverTrigger>
                                <Avatar className="h-10 w-10 xl:h-12 xl:w-12">
                                    <AvatarImage src="./images/avatar.jpeg" alt="@shadcn" />
                                    <AvatarFallback>AV</AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>

                            <PopoverContent className="w-60 p-0 mr-4">
                                <div className="flex items-center hover:bg-secondary p-3 rounded cursor-pointer" >
                                    <Instagram size={isKiosk ? "40px" : "20px"}/>
                                    <p className="ml-2 text-sm font-light">Thông tin cá nhân</p>
                                </div>
                                {renderChangeDarkMode()}
                                <div className="flex items-center hover:bg-secondary p-3 rounded cursor-pointer" onClick={() => { }}>
                                    <SquareArrowOutUpRight size={isKiosk ? "40px" : "20px"} />
                                    <p className="ml-2 text-sm font-light">Hỗ trợ</p>
                                </div>
                                <div className="border" />
                                <div className="flex items-center hover:bg-secondary p-3 rounded cursor-pointer" onClick={handleLogout}>
                                    <LogOut size={isKiosk ? "40px" : "20px"} />
                                    <p className="ml-2 text-sm font-light">Đăng xuất</p>
                                </div>
                            </PopoverContent>
                        </Popover>
                }
            </div>

            <div className={cn("absolute flex gap-2 top-4 z-10", isMobile ? "flex-row" : "flex-col")}>
                {
                    (!open || isMobile) &&
                    <div className="pl-2 xl:fixed xl:bottom-4 flex xl:flex-col gap-2 xl:left-4">
                        <TooltipProvider delayDuration={0}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button
                                        variant="secondary"
                                        size={mode !== EModeApp.KIOSK ? "icon" : "default"}
                                        className={cn("border", isKiosk && "p-6")}
                                        onClick={() => {
                                            navigate("/")
                                        }}
                                    >
                                        {
                                            mode !== EModeApp.KIOSK ? <PlusIcon
                                                style={{ height: "28px", width: "28px" }}
                                            /> : "Quay lại"
                                        }

                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Cuộc trò chuyện mới</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        {
                            mode !== EModeApp.KIOSK &&
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
                        }
                    </div>
                }
                <AccordionBot />
            </div>

            <Outlet />
        </>
    )
}

export default ContentSidebar