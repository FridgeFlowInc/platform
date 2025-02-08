import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import { productUpdate } from '@/api/v1/product/update'
import { delay } from '@/lib/delay'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useProducts } from '../context/products-context'
import { Product } from '../data/schema'
import { MutateForm } from './mutate-form'

interface Props {
  open: boolean
  onOpenChange: (updated: boolean) => void
  currentRow: Product
}

export function ProductsUpdateDialog({
  open,
  onOpenChange,
  currentRow,
}: Props) {
  const queryClient = useQueryClient()
  const { setOpen } = useProducts()
  const form = useForm()

  useEffect(() => {
    if (currentRow) {
      form.reset(currentRow)
    }
  }, [currentRow])

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      await delay(200)
      return productUpdate(currentRow.id, data)
    },
    onSuccess: () => {
      toast.success('Продукт обновлен')
      queryClient.invalidateQueries(['productsGet'])
      setOpen(null)
    },
  })

  const onSubmit = async (data) => {
    updateMutation.mutate(data)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          onOpenChange(false)
          form.reset()
        }
      }}
    >
      <DialogContent
        className='max-h-[90vh] max-w-full sm:max-w-[425px]'
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>Редактировать продукт</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <MutateForm
            formId='products-update-form'
            form={form}
            onSubmit={form.handleSubmit(onSubmit)}
          />
        </ScrollArea>
        <DialogFooter className='flex flex-wrap gap-2'>
          <DialogClose asChild>
            <Button
              variant='outline'
              disabled={updateMutation.isPending}
              onClick={() => onOpenChange(false)}
            >
              Закрыть
            </Button>
          </DialogClose>
          <Button
            type='submit'
            form='products-update-form'
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? (
              <Loader className='animate-spin' />
            ) : (
              'Обновить'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
