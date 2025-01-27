import { useProducts } from '../context/products-context'
import { ShoppingCartProductDeleteDialog } from './shopping-cart-products-delete-dialog'
import { ShoppingCartProductsMutateDialog } from './shopping-cart-products-mutate-dialog'
import { ShoppingCartProductsViewDialog } from './shopping-cart-products-view-dialog'

export function ProductsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useProducts()

  return (
    <>
      <ShoppingCartProductsMutateDialog
        key='shopping-cart-product-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      {currentRow && (
        <>
          <ShoppingCartProductsViewDialog
            key={`shopping-cart-product-view-${currentRow.id}`}
            open={open === 'view'}
            onOpenChange={() => {
              setOpen('view')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ShoppingCartProductsMutateDialog
            key={`shopping-cart-product-update-${currentRow.id}`}
            open={open === 'update'}
            onOpenChange={() => {
              setOpen('update')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ShoppingCartProductDeleteDialog
            key='shopping-cart-product-delete'
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
