import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import ContentSidebar from "../sidebar/content-sidebar";

export default function Layout() {

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="h-screen xl:pl-2">
        <ContentSidebar />
        <p className="text-primary/30 text-sm fixed bottom-2 text-center w-screen">Phát triển bởi Văn phòng UBND thành phố Hà Nội</p>
      </SidebarInset>
    </SidebarProvider>
  )
}
