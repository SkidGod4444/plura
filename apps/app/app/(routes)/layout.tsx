import Infobar from "@/components/custom/infobar/infobar";
import ProgressBar from "@/components/custom/progress.bar";
import { AppSidebar } from "@/components/custom/sidebar/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
async function RouteLayout({children}: {children: React.ReactNode}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("plura-sidebar:state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <div className="p-2">
        <ProgressBar />
        <Infobar />
        {children}
      </div>
    </SidebarProvider>
  );
}
export default RouteLayout;
