import { useState } from 'react'
import { Scanner } from '@yudiel/react-qr-scanner'
import { productGet } from '@/api/v1/product/get'
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
import { useProducts } from '@/features/products/context/products-context'
import {
  type Product,
  productSchemaBase,
  productSchema,
} from '@/features/products/data/schema'
import { decompressProduct } from '@/features/products/lib/compression'

interface Props {
  open: boolean
  setOpen: (popup: string) => void
  onOpenChange: (open: boolean) => void
  setFromQrCodePopup: (fromQrCodePopup: boolean) => void
}

export function ScanQRDialog({
  open,
  onOpenChange,
  setFromQrCodePopup,
}: Props) {
  const [error, setError] = useState<string | null>(null)
  const [product, setProduct] = useState<Product | null>(null)
  const [productFound, setProductFound] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showScanner, setShowScanner] = useState<boolean>(true)
  const [fromActions, setFromActions] = useState<boolean>(false)

  const { setOpen, setCurrentRow } = useProducts()

  const handleScan = async (result: any) => {
    if (result?.[0]?.rawValue) {
      try {
        setIsLoading(true)
        await delay(500)

        const decompressedProduct = decompressProduct(result[0].rawValue)

        const matchedProducts = await productGet(
          JSON.stringify(decompressedProduct)
        )

        if (matchedProducts.length === 0) {
          setProduct(productSchemaBase.parse(decompressedProduct))
          setProductFound(false)
        } else {
          setProduct(productSchema.parse(matchedProducts[0]))
          setProductFound(true)
        }

        setError(null)
        setShowScanner(false)
        setIsLoading(false)
      } catch (e) {
        console.error(e)
        setError('Ошибка при обработке QR-кода')
        setIsLoading(false)
      }
    }
  }

  const handleEdit = () => {
    if (product) {
      setFromActions(true)
      setCurrentRow(product)
      setOpen('update')
      setFromQrCodePopup(true)
    }
  }

  const handleDelete = () => {
    if (product) {
      setFromActions(true)
      setCurrentRow(product)
      setOpen('delete')
      setFromQrCodePopup(true)
    }
  }

  const handleCreate = () => {
    if (product) {
      setFromActions(true)
      setCurrentRow(product)
      setOpen('create')
      setFromQrCodePopup(true)
    }
  }

  const resetState = () => {
    setError(null)
    setProduct(null)
    setProductFound(null)
    setIsLoading(false)
    setShowScanner(true)
    setFromActions(false)
    if (!fromActions) {
      setFromQrCodePopup(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        if (!v) {
          resetState()
        }
      }}
    >
      <DialogContent className='gap-2 sm:max-w-md'>
        <DialogHeader className='text-left'>
          <DialogTitle>Сканировать QR</DialogTitle>
          <DialogDescription>
            {showScanner
              ? 'Наведите камеру на валидный qr-код'
              : 'Информация о продукте'}
          </DialogDescription>
        </DialogHeader>

        <div className='flex justify-center items-center'>
          {open && !isLoading && showScanner && (
            <Scanner
              onScan={handleScan}
              onError={(err) => {
                console.error('QR scanning error:', err)
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
          <ScrollArea className='h-[200px] w-full rounded-md border p-4'>
            <h3 className='mb-2 font-semibold'>
              {productFound ? 'Продукт найден' : 'Продукт не найден'}
            </h3>
            <pre className='text-sm'>{JSON.stringify(product, null, 2)}</pre>
          </ScrollArea>
        )}

        <DialogFooter className='flex flex-wrap gap-2 sm:gap-4'>
          <DialogClose asChild>
            <Button
              variant='outline'
              disabled={isLoading}
              className='flex-1 sm:flex-none'
            >
              Закрыть
            </Button>
          </DialogClose>
          {product && productFound && (
            <>
              <Button onClick={handleEdit} className='flex-1 sm:flex-none'>
                Редактировать
              </Button>
              <Button
                onClick={handleDelete}
                variant='destructive'
                className='flex-1 sm:flex-none'
              >
                Удалить
              </Button>
            </>
          )}
          {product && !productFound && (
            <Button onClick={handleCreate} className='flex-1 sm:flex-none'>
              Создать
            </Button>
          )}
          {product && (
            <Button
              onClick={resetState}
              variant='outline'
              className='flex-1 sm:flex-none'
            >
              Сканировать снова
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
