import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { productDelete } from '@/api/v1/product/delete'
import { delay } from '@/lib/delay'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { Product } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Product
}

export function ProductsDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: Props) {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await delay(200)
      await productDelete(currentRow.id)
    },
    onSuccess: () => {
      toast.success('Продукт удалён')
      queryClient.invalidateQueries(['productsGet'])
      onOpenChange(false)
    },
  })

  return (
    <ConfirmDialog
      key='product-delete'
      destructive
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={() => {
        deleteMutation.mutate()
      }}
      isLoading={deleteMutation.isPending}
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
