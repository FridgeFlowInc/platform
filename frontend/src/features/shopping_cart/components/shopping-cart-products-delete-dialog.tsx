import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { shoppingCartProductDelete } from '@/api/v1/shopping_cart/delete'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { shoppingCartProduct } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: shoppingCartProduct
}

export function ShoppingCartProductDeleteDialog({
  currentRow,
  open,
  onOpenChange,
}: Props) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => shoppingCartProductDelete(currentRow.id),
    onSuccess: () => {
      toast.success('Продукт удалён')
      queryClient.invalidateQueries(['shoppingCartProductsGet'])
      onOpenChange(false)
    },
    onError: () => {
      toast.error('Ошибка при удалении продукта')
    },
  })

  const handleConfirm = () => {
    mutation.mutate()
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
      isLoading={mutation.isPending}
      className='max-w-md'
      title={`Удалить продукт?`}
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
