import { useProducts } from '../context/products-context'
import { ProductDeleteDialog } from './products-delete-dialog'
import { ProductsMutateDialog } from './products-mutate-dialog'
import { ProductsViewQRDialog } from './products-qr-dialog'
import { ScanQRDialog } from './products-scan-qr-dialog'
import { ProductsViewDialog } from './products-view-dialog'

interface Props {
  refetchProducts: () => void
}

export function ProductsDialogs({ refetchProducts }: Props) {
  const { open, setOpen, currentRow, setCurrentRow } = useProducts()

  return (
    <>
      <ScanQRDialog
        key='scan-qr'
        open={open === 'scan-qr'}
        onOpenChange={() => setOpen('scan-qr')}
      />
      <ProductsMutateDialog
        key='product-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
        refetchProducts={refetchProducts}
      />

      {currentRow && (
        <>
          <ProductsViewDialog
            key={`product-view-${currentRow.id}`}
            open={open === 'view'}
            onOpenChange={() => {
              setOpen('view')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ProductsMutateDialog
            key={`product-update-${currentRow.id}`}
            open={open === 'update'}
            onOpenChange={() => {
              setOpen('update')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
            refetchProducts={refetchProducts}
          />

          <ProductsViewQRDialog
            key={`product-viewqr-${currentRow.id}`}
            open={open === 'viewqr'}
            onOpenChange={() => {
              setOpen('viewqr')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ProductDeleteDialog
            key='product-delete'
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
            refetchProducts={refetchProducts}
          />
        </>
      )}
    </>
  )
}
