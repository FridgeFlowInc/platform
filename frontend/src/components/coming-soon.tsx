import { IconPlanet } from '@tabler/icons-react'
import { Header } from '@/components/header'

export default function ComingSoon() {
  return (
    <>
      <Header />
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
