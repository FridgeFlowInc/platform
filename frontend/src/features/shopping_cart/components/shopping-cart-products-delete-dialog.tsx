import { useState } from 'react'
import { toast } from 'sonner'
import { shoppingCartProductDelete } from '@/api/v1/shopping_cart/delete'
import { delay } from '@/lib/delay'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { shoppingCartProduct } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: shoppingCartProduct
  refetchShoppingCartProducts: () => void
}

export function ShoppingCartProductDeleteDialog({
  currentRow,
  open,
  onOpenChange,
  refetchShoppingCartProducts,
}: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    setIsLoading(true)
    await delay(200)
    try {
      await shoppingCartProductDelete(currentRow.id)
      toast.success('Продукт удалён')
      refetchShoppingCartProducts()
    } catch (error) {
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
      }}
      handleConfirm={handleConfirm}
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
