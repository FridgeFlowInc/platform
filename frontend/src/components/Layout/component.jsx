import { Outlet } from 'react-router-dom';

import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

import { AppSidebar } from '@/components/Layout/sidebar';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="absolute top-4 right-4">
          <ThemeSwitcher />
        </div>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <Breadcrumbs />
        </header>
        <div className="p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
