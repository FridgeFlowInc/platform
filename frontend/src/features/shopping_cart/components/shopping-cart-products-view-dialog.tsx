import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { shoppingCartProduct } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: shoppingCartProduct
}

export function ShoppingCartProductsViewDialog({
  open,
  onOpenChange,
  currentRow,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] overflow-y-auto max-w-full sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Продукт</DialogTitle>
          <DialogDescription>Детали текущего продукта</DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <div className='space-y-4'>
            <div>
              <h4 className='font-bold'>Название</h4>
              <p>{currentRow?.name || '—'}</p>
            </div>
            <div>
              <h4 className='font-bold'>Количество</h4>
              <p>{currentRow?.quantity || '—'}</p>
            </div>
            <div>
              <h4 className='font-bold'>Единицы измерения</h4>
              <p>{currentRow?.unit || '—'}</p>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant='outline'>
            Закрыть
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
