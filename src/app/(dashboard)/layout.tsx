import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { requireSession } from '@/lib/auth-session'

export default async function DashboardLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const session = await requireSession()

    return (
        <SidebarProvider>
            <AppSidebar user={session.user} />
            <SidebarInset>
                <DashboardHeader />
                <main className='flex-1 w-full px-4 py-6'>{children}</main>
            </SidebarInset>
        </SidebarProvider>
    )
}
