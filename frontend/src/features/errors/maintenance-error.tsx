// import { Button } from '@/components/ui/button'

export default function MaintenanceError() {
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] font-bold leading-tight'>503</h1>
        <span className='font-medium'>Сайт на техобслуживании</span>
        <p className='text-center text-muted-foreground'>
          Сайт сейчас не доступен, попробуйте позже
        </p>
        {/* <div className='mt-6 flex gap-4'>
          <Button variant='outline'>Статусная страница</Button>
        </div> */}
      </div>
    </div>
  )
}
