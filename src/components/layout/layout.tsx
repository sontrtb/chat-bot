import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronDown, LogOut } from "lucide-react";
import ListBot from "../common/list-bot";

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login")
  }

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="h-screen">
        <div className="flex justify-between items-center bg-neutral-50 p-2 my-2 mr-2 rounded-md shadow border">
          <div className="flex items-center">
            <SidebarTrigger className="mr-5"/>
            <Popover>
              <PopoverTrigger className="flex bg-neutral-100 px-2 py-1 border rounded-md">
                  <p className="mr-3">Chat GPT</p>
                  <ChevronDown />
              </PopoverTrigger>

              <PopoverContent align="start"  className="w-[450px] p-1">
                <ListBot />
              </PopoverContent>
            </Popover>
          </div>


          <Popover>
            <PopoverTrigger>
              <Avatar className="h-8 w-8">
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
      </SidebarInset>
    </SidebarProvider>
  )
}
