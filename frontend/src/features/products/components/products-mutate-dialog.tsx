import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import { productCreate } from '@/api/v1/product/create'
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { useProducts } from '@/features/products/context/products-context'
import { Product } from '../data/schema'
import { productSchemaBase } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  refetchProducts: () => void
  setFromQrCodePopup: (fromQrCodePopup: boolean) => void
  fromQrCodePopup: boolean
}

type ProductsForm = z.infer<typeof productSchemaBase>

export function ProductsMutateDialog({
  open,
  onOpenChange,
  refetchProducts,
  setFromQrCodePopup,
  fromQrCodePopup,
}: Props) {
  const { setOpen, currentRow } = useProducts()

  const [isUpdate, setIsUpdate] = useState(!!currentRow)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ProductsForm>({
    resolver: zodResolver(productSchemaBase),
    defaultValues: currentRow ?? {
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

  useEffect(() => {
    if (currentRow) {
      setIsUpdate(true)
      form.reset(currentRow)
    }
  }, [currentRow])

  const onSubmit = async (data: ProductsForm) => {
    setIsLoading(true)

    await delay(200)
    if (currentRow && currentRow.id) {
      await productUpdate(currentRow.id, JSON.stringify(data))
    } else {
      await productCreate(JSON.stringify(data))
    }

    refetchProducts()

    onOpenChange(false)
    form.reset()
    if (fromQrCodePopup) {
      setOpen('scan-qr')
      setFromQrCodePopup(false)
    }

    toast.success(isUpdate ? 'Продукт обновлен' : 'Продукт создан')

    setIsLoading(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        if (!v) form.reset()
        setIsLoading(false)
        if (fromQrCodePopup) {
          setOpen('scan-qr')
        }
        if (fromQrCodePopup && !v) {
          setFromQrCodePopup(false)
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
          <DialogTitle>{isUpdate ? 'Изменить' : 'Создать'} продукт</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form
              id='products-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-5'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название</FormLabel>
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
                name='category'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Категория</FormLabel>
                    <FormControl>
                      <Input placeholder='Категория' {...field} />
                    </FormControl>
                    <FormDescription>
                      Введите категорию продукта (макс. 200 символов).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='manufacturer'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Производитель</FormLabel>
                    <FormControl>
                      <Input placeholder='Производитель' {...field} />
                    </FormControl>
                    <FormDescription>
                      Введите производителя (макс. 200 символов).
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
                    <FormLabel>Количество</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='.0001'
                        placeholder='Количество'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Введите количество продукта (число).
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
                    <FormLabel>Ед. измерения</FormLabel>
                    <FormControl>
                      <Input placeholder='Ед. измерения' {...field} />
                    </FormControl>
                    <FormDescription>
                      Введите единицу измерения (макс. 50 символов).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='nutritional_value'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пищевая ценность (ккал/100г)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='.01'
                        placeholder='Пищевая ценность (ккал/100г)'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Введите пищевую ценность продукта (не обязательно).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='total_net_weight'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Масса нетто</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='.0001'
                        placeholder='Масса нетто'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Введите массу нетто продукта (необязательно).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='total_gross_weight'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Масса брутто</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='.0001'
                        placeholder='Масса брутто'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Введите массу брутто продукта (необязательно).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='manufacture_date'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дата производства</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
                    </FormControl>
                    <FormDescription>
                      Введите дату производства (YYYY-MM-DD).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='expiration_date'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Срок годности</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
                    </FormControl>
                    <FormDescription>
                      Введите дату истечения срока годности (YYYY-MM-DD).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='notes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Заметки</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Заметки' {...field} />
                    </FormControl>
                    <FormDescription>
                      Введите дополнительные заметки (макс. 1000 символов).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='allergens'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Аллергены</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Аллергены' {...field} />
                    </FormControl>
                    <FormDescription>
                      Введите информацию об аллергенах (макс. 1000 символов).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild disabled={isLoading}>
            <Button variant='outline'>Закрыть</Button>
          </DialogClose>
          <Button type='submit' form='products-form' disabled={isLoading}>
            {isLoading ? (
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
