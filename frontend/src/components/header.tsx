import { Header as HeaderComponent } from '@/components/layout/header'
import { NotificationsPanel } from '@/components/notifications'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'

export function Header() {
  return (
    <HeaderComponent fixed>
      <div className='ml-auto flex items-center space-x-4'>
        <NotificationsPanel />
        <ThemeSwitch />
        <ProfileDropdown />
      </div>
    </HeaderComponent>
  )
}
