import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import AccordionBot from "@/pages/chat/components/accordion-bot";
import ContentSidebar from "../sidebar/content-sidebar";

export default function Layout() {


  return (
    <SidebarProvider
    className="bg-[url('/images/background.png')] bg-no-repeat bg-auto bg-right-top"
    >
      <AppSidebar />

      <SidebarInset className="h-screen pl-2">
        <ContentSidebar />
        <AccordionBot />
      </SidebarInset>
    </SidebarProvider>
  )
}
