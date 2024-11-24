import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import ContentSidebar from "../sidebar/content-sidebar";

export default function Layout() {
  
  return (
    <SidebarProvider
    className="bg-[url('/images/background.png')] bg-no-repeat bg-cover bg-center"
    >
      <AppSidebar />
      <SidebarInset className="h-screen pl-2">
        <ContentSidebar />
      </SidebarInset>
    </SidebarProvider>
  )
}
