import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import { shoppingCartProductCreate } from '@/api/v1/shopping_cart/create'
import { shoppingCartProductUpdate } from '@/api/v1/shopping_cart/update'
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { shoppingCartProduct } from '../data/schema'
import { shoppingCartProductSchemaBase } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: shoppingCartProduct
}

type ProductsForm = z.infer<typeof shoppingCartProductSchemaBase>

export function ShoppingCartProductsMutateDialog({
  open,
  onOpenChange,
  currentRow,
}: Props) {
  const queryClient = useQueryClient()
  const isUpdate = !!currentRow

  const form = useForm<ProductsForm>({
    resolver: zodResolver(shoppingCartProductSchemaBase),
    defaultValues: currentRow ?? {
      name: '',
      quantity: '',
      unit: '',
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: ProductsForm) => {
      await delay(200)
      if (isUpdate && currentRow) {
        return shoppingCartProductUpdate(currentRow.id, JSON.stringify(data))
      } else {
        return shoppingCartProductCreate(JSON.stringify(data))
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['shoppingCartProductsGet'])
      onOpenChange(false)
      form.reset()
      toast.success(isUpdate ? 'Продукт обновлен' : 'Продукт создан')
    },
  })

  const onSubmit = async (data: ProductsForm) => {
    mutation.mutate(data)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        if (!v) form.reset()
      }}
    >
      <DialogContent
        className='max-h-[90vh] max-w-full sm:max-w-[425px]'
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>{isUpdate ? 'Изменить' : 'Создать'} продукт</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form
              id='products-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-5 p-1'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Название' {...field} />
                    </FormControl>
                    <FormDescription>
                      Название продукта (макс. 200 символов).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='quantity'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type='number'
                        step='.0001'
                        placeholder='Количество'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Введите количество продукта.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='unit'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Единицы измерения' {...field} />
                    </FormControl>
                    <FormDescription>
                      Введите единицы измерения (макс. 50 символов).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter className='flex flex-wrap gap-2'>
          <DialogClose asChild disabled={mutation.isPending}>
            <Button variant='outline'>Закрыть</Button>
          </DialogClose>
          <Button
            type='submit'
            form='products-form'
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <Loader className='animate-spin' />
            ) : isUpdate ? (
              'Обновить'
            ) : (
              'Создать'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
