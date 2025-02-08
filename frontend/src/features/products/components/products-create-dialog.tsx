import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import { productCreate } from '@/api/v1/product/create'
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
import { productSchemaBase } from '@/features/products/data/schema'
import { MutateForm } from './mutate-form'

interface Props {
  open: boolean
  onOpenChange: (created: boolean) => void
}

export function ProductsCreateDialog({ open, onOpenChange }: Props) {
  const queryClient = useQueryClient()
  const form = useForm({
    resolver: zodResolver(productSchemaBase),
    defaultValues: {
      name: '',
      category: '',
      manufacturer: '',
      quantity: 1,
      unit: 'штуки',
      nutritional_value: 0,
      total_net_weight: 0,
      total_gross_weight: 0,
      manufacture_date: '',
      expiration_date: '',
      notes: '',
      allergens: '',
    },
  })

  const createMutation = useMutation({
    mutationFn: async (data) => {
      await delay(200)
      return productCreate(data)
    },
    onSuccess: () => {
      toast.success('Продукт создан')
      queryClient.invalidateQueries(['productsGet'])
      onOpenChange(false)
      form.reset()
    },
  })

  const onSubmit = (data) => {
    createMutation.mutate(data)
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
          <DialogTitle>Создать продукт</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <MutateForm
            formId='create-product-form'
            form={form}
            onSubmit={form.handleSubmit(onSubmit)}
          />
        </ScrollArea>
        <DialogFooter className='flex flex-wrap gap-2'>
          <DialogClose asChild>
            <Button variant='outline' onClick={() => onOpenChange(false)}>
              Закрыть
            </Button>
          </DialogClose>
          <Button
            type='submit'
            form='create-product-form'
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? (
              <Loader className='animate-spin' />
            ) : (
              'Создать'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
