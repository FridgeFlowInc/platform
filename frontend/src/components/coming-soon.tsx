import { IconPlanet } from '@tabler/icons-react'
import { Header } from '@/components/layout/header'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'

export default function ComingSoon() {
  return (
    <>
      <Header fixed>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <div className='h-svh'>
        <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
          <IconPlanet size={72} />
          <h1 className='text-4xl font-bold leading-tight'>В разработке 👀</h1>
          <p className='text-center text-muted-foreground'>
            (нет, мне прод делать надо)
          </p>
        </div>
      </div>
    </>
  )
}
