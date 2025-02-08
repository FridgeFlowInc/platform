import { useProducts } from '../context/products-context'
import { ProductsCreateDialog } from './products-create-dialog'
import { ProductsDeleteDialog } from './products-delete-dialog'
import { ProductsViewQRDialog } from './products-qr-dialog'
import { ScanQRDialog } from './products-scan-qr-dialog'
import { ProductsUpdateDialog } from './products-update-dialog'
import { ProductsViewDialog } from './products-view-dialog'

export function ProductsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useProducts()

  const handleClose = () => {
    setCurrentRow(null)
    setOpen(null)
  }

  return (
    <>
      <ScanQRDialog
        key='scan-qr'
        open={open === 'scan-qr'}
        onOpenChange={(v) => !v && handleClose()}
      />
      <ProductsCreateDialog
        key='product-create'
        open={open === 'create'}
        onOpenChange={(v) => !v && handleClose()}
      />

      {currentRow && (
        <>
          <ProductsViewDialog
            key={`product-view-${currentRow.id}`}
            open={open === 'view'}
            onOpenChange={(v) => !v && handleClose()}
            currentRow={currentRow}
          />

          <ProductsUpdateDialog
            key={`product-update-${currentRow.id}`}
            open={open === 'update'}
            onOpenChange={(v) => !v && handleClose()}
            currentRow={currentRow}
          />

          <ProductsViewQRDialog
            key={`product-view-qr-${currentRow.id}`}
            open={open === 'view-qr'}
            onOpenChange={(v) => !v && handleClose()}
            currentRow={currentRow}
          />

          <ProductsDeleteDialog
            key={`product-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={(v) => !v && handleClose()}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
