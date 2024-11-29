import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import ContentSidebar from "../sidebar/content-sidebar";

export default function Layout() {

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <ContentSidebar />
      </SidebarInset>
    </SidebarProvider>
  )
}
