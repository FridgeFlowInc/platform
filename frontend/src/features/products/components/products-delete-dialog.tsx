import { useState } from 'react'
import { toast } from 'sonner'
import { productDelete } from '@/api/v1/product/delete'
import { delay } from '@/lib/delay'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { Product } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  setOpen: (popup: string) => void
  currentRow: Product
  refetchProducts: () => void
  setFromQrCodePopup: (fromQrCodePopup: boolean) => void
  fromQrCodePopup: boolean
}

export function ProductDeleteDialog({
  currentRow,
  open,
  setOpen,
  onOpenChange,
  refetchProducts,
  setFromQrCodePopup,
  fromQrCodePopup,
}: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    setIsLoading(true)
    await delay(200)
    try {
      await productDelete(currentRow.id)
      toast.success('Продукт удалён')
      refetchProducts()
    } catch (error) {
      console.log(error)
      toast.error('Ошибка при удалении продукта')
    } finally {
      setIsLoading(false)
      onOpenChange(false)
    }
  }

  return (
    <ConfirmDialog
      key='product-delete'
      destructive
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        setIsLoading(false)
        if (fromQrCodePopup) {
          setOpen('scan-qr')
        }
        if (fromQrCodePopup && !v) {
          setFromQrCodePopup(false)
        }
      }}
      handleConfirm={() => {
        setFromQrCodePopup(false)
        handleConfirm()
      }}
      isLoading={isLoading}
      className='max-w-md'
      title={`Удалить продукт: ${currentRow?.name} ?`}
      desc={
        <>
          Вы хотите удалить продукт <strong>{currentRow?.name}</strong>. <br />
          Это действие необратимо.
        </>
      }
      confirmText='Удалить'
      cancelBtnText='Отменить'
    />
  )
}
