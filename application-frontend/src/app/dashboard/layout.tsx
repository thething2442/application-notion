'use client'
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ComponentProvider } from "@/components/ComponentContext"
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <ComponentProvider>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <AppSidebar />
        <main className="flex-1 overflow-hidden">
          {children}
          </main>
        </div>
      </SidebarProvider>
    </ComponentProvider>
  )
}