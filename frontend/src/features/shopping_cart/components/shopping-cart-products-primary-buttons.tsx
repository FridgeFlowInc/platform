import { IconCirclePlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useProducts } from '../context/products-context'

export function ShoppingCartProductsPrimaryButtons() {
  const { setOpen } = useProducts()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('create')}>
        <span>Cоздать</span> <IconCirclePlus size={18} />
      </Button>
    </div>
  )
}
