import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Scanner } from '@yudiel/react-qr-scanner'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import { productCreate } from '@/api/v1/product/create'
import { productDelete } from '@/api/v1/product/delete'
import { productGet } from '@/api/v1/product/get'
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
import {
  type Product,
  productSchemaBase,
  productSchema,
} from '@/features/products/data/schema'
import { decompressProduct } from '@/features/products/lib/compression'
import { MutateForm } from './mutate-form'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ScanQRDialog({ open, onOpenChange }: Props) {
  const [error, setError] = useState<string | null>(null)
  const [product, setProduct] = useState<Product | null>(null)
  const [productFound, setProductFound] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showScanner, setShowScanner] = useState<boolean>(true)

  const queryClient = useQueryClient()

  const form = useForm({
    resolver: zodResolver(productSchemaBase),
    defaultValues: product || {},
  })

  const createMutation = useMutation({
    mutationFn: async (data: Product) => {
      await delay(200)
      return productCreate(data)
    },
    onSuccess: () => {
      toast.success('Продукт создан')
      queryClient.invalidateQueries({ queryKey: ['productsGet'] })
      onOpenChange(false)
      resetState()
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (data: Product) => {
      await delay(200)
      return productUpdate(product!.id, data)
    },
    onSuccess: () => {
      toast.success('Продукт обновлен')
      queryClient.invalidateQueries({ queryKey: ['productsGet'] })
      onOpenChange(false)
      resetState()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await delay(200)
      await productDelete(product!.id)
    },
    onSuccess: () => {
      toast.success('Продукт удалён')
      queryClient.invalidateQueries({ queryKey: ['productsGet'] })
      onOpenChange(false)
      resetState()
    },
  })

  useEffect(() => {
    if (open && product) {
      setShowScanner(false)
      form.reset(product)
    }
  }, [open, product, form])

  const handleScan = async (result: any) => {
    if (result?.[0]?.rawValue) {
      try {
        setIsLoading(true)
        await delay(250)

        const decompressedProduct = decompressProduct(result[0].rawValue)

        const matchedProducts = await productGet(
          JSON.stringify(decompressedProduct)
        )

        if (matchedProducts.length === 0) {
          const newProduct = productSchemaBase.parse(decompressedProduct)
          setProduct(newProduct)
          setProductFound(false)
          console.log(productFound)
          form.reset(newProduct)
        } else {
          const existingProduct = productSchema.parse(matchedProducts[0])
          setProduct(existingProduct)
          setProductFound(true)
          form.reset(existingProduct)
        }

        setError(null)
        setShowScanner(false)
        setIsLoading(false)
      } catch {
        setError('Ошибка при обработке QR-кода')
        setIsLoading(false)
      }
    }
  }

  const handleDelete = () => {
    if (product) {
      deleteMutation.mutate()
    }
  }

  const resetState = () => {
    setError(null)
    setProductFound(null)
    setIsLoading(false)
    setShowScanner(true)
    setProduct(null)
    form.reset({})
  }

  const onSubmit = form.handleSubmit((data) => {
    if (productFound) {
      updateMutation.mutate(data as Product)
    } else {
      createMutation.mutate(data as Product)
    }
  })

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        if (!v) resetState()
      }}
    >
      <DialogContent className='gap-2 sm:max-w-md'>
        <DialogHeader className='text-left'>
          <DialogTitle>Сканировать QR</DialogTitle>
          <DialogDescription>
            {showScanner
              ? 'Наведите камеру на валидный qr-код'
              : productFound
                ? 'Редактировать продукт'
                : 'Создать новый продукт'}
          </DialogDescription>
        </DialogHeader>

        <div className='flex justify-center items-center'>
          {open && !isLoading && showScanner && (
            <Scanner
              onScan={handleScan}
              onError={() => {
                setError('Камера недоступна')
              }}
              constraints={{
                width: { max: 1024 },
                height: { max: 1024 },
                aspectRatio: { ideal: 1 },
                facingMode: 'environment',
              }}
              allowMultiple={true}
            />
          )}
        </div>

        {error && !isLoading && <p className='text-red-500 text-sm'>{error}</p>}

        {isLoading && (
          <div
            role='status'
            className='inset-0 z-50 flex items-center justify-center bg-background bg-opacity-50 transition-opacity duration-300 ease-in-out h-[250px]'
          >
            <div className='h-12 w-12'>
              <div className='h-full w-full rounded-full border-5 border-muted animate-spin border-t-foreground' />
            </div>
          </div>
        )}

        {product && !showScanner && (
          <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
            <MutateForm
              form={form}
              formId='products-mutate-from-qr'
              onSubmit={onSubmit}
            />
          </ScrollArea>
        )}

        <DialogFooter className='flex flex-wrap gap-2 sm:gap-4'>
          {showScanner && (
            <DialogClose asChild>
              <Button
                variant='outline'
                disabled={isLoading}
                className='flex-1 sm:flex-none'
              >
                Закрыть
              </Button>
            </DialogClose>
          )}
          {product && !showScanner && (
            <>
              <Button
                onClick={resetState}
                variant='outline'
                className='flex-1 sm:flex-none'
                disabled={
                  createMutation.isPending ||
                  updateMutation.isPending ||
                  deleteMutation.isPending
                }
              >
                Сканировать снова
              </Button>
              {productFound && (
                <Button
                  onClick={handleDelete}
                  variant='destructive'
                  className='flex-1 sm:flex-none'
                  disabled={
                    createMutation.isPending ||
                    updateMutation.isPending ||
                    deleteMutation.isPending
                  }
                >
                  {deleteMutation.isPending ? (
                    <Loader className='animate-spin' />
                  ) : (
                    'Удалить'
                  )}
                </Button>
              )}
              <Button
                type='submit'
                onClick={onSubmit}
                className='flex-1 sm:flex-none'
                disabled={
                  createMutation.isPending ||
                  updateMutation.isPending ||
                  deleteMutation.isPending
                }
              >
                {createMutation.isPending || updateMutation.isPending ? (
                  <Loader className='animate-spin' />
                ) : productFound ? (
                  'Обновить'
                ) : (
                  'Создать'
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
