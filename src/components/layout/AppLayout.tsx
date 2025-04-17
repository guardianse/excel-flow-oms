
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "./Header";

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex flex-col flex-1 w-0 overflow-hidden">
          <Header />
          <main className="flex-1 p-4 md:p-6 overflow-auto custom-scrollbar animate-fade-in">
            <div className="container max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
          <footer className="border-t py-3 px-6 text-center text-sm text-muted-foreground">
            <p>Excel-Flow OMS &copy; 2025 - Simplifying Warehouse Management</p>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
