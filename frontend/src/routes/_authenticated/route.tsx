import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/authStore'
import { cn } from '@/lib/utils'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import SkipToMain from '@/components/skip-to-main'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
})

function RouteComponent() {
  const defaultOpen = Cookies.get('sidebar:state') !== 'false'
  const navigate = useNavigate()
  const { checkedAuthentication, isAuthenticated } = useAuthStore(
    (state) => state.auth
  )

  useEffect(() => {
    if (checkedAuthentication && !isAuthenticated) {
      navigate({ to: '/sign-in' })
      toast.warning('Авторизуйтесь')
    }
  }, [checkedAuthentication, isAuthenticated])

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <SkipToMain />
      <AppSidebar />
      <div
        id='content'
        className={cn(
          'max-w-full w-full ml-auto',
          'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
          'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
          'transition-[width] ease-linear duration-200',
          'h-svh flex flex-col',
          'group-data-[scroll-locked=1]/body:h-full',
          'group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh'
        )}
      >
        {isAuthenticated ? <Outlet /> : null}
      </div>
    </SidebarProvider>
  )
}
