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
import { Textarea } from '@/components/ui/textarea'
import { Product } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Product
}

export function ProductsViewDialog({ open, onOpenChange, currentRow }: Props) {
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-')
    return `${month}-${day}-${year}`
  }

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
              <p>{currentRow.name}</p>
            </div>
            <div>
              <h4 className='font-bold'>Категория</h4>
              <p>{currentRow.category}</p>
            </div>
            <div>
              <h4 className='font-bold'>Производитель</h4>
              <p>{currentRow.manufacturer}</p>
            </div>
            <div>
              <h4 className='font-bold'>Количество</h4>
              <p>{currentRow.quantity}</p>
            </div>
            <div>
              <h4 className='font-bold'>Единицы измерения</h4>
              <p>{currentRow.unit}</p>
            </div>
            <div>
              <h4 className='font-bold'>Пищевая ценность [ккал/100г]</h4>
              <p>{currentRow?.nutritional_value || '—'}</p>
            </div>
            <div>
              <h4 className='font-bold'>Масса нетто [граммы]</h4>
              <p>{currentRow?.total_net_weight || '—'}</p>
            </div>
            <div>
              <h4 className='font-bold'>Масса брутто [граммы]</h4>
              <p>{currentRow?.total_gross_weight || '—'}</p>
            </div>
            <div>
              <h4 className='font-bold'>Дата производства</h4>
              <p>{formatDate(currentRow.manufacture_date)}</p>
            </div>
            <div>
              <h4 className='font-bold'>Срок годности</h4>
              <p>{formatDate(currentRow.expiration_date)}</p>
            </div>
            <div>
              <h4 className='font-bold'>Заметки</h4>
              <Textarea value={currentRow?.notes || '—'} readOnly />
            </div>
            <div>
              <h4 className='font-bold'>Аллергены</h4>
              <Textarea value={currentRow?.allergens || '—'} readOnly />
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
