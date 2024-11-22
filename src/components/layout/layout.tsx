import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import ContentSidebar from "../sidebar/content-sidebar";
import AccordionBot from "../common/accordion-bot";

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
