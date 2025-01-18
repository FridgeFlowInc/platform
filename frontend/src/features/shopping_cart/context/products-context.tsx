import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { shoppingCartProduct } from '../data/schema'

type ProductsDialogType = 'view' | 'create' | 'update' | 'delete'

interface ProductsContextType {
  open: ProductsDialogType | null
  setOpen: (str: ProductsDialogType | null) => void
  currentRow: shoppingCartProduct | null
  setCurrentRow: React.Dispatch<
    React.SetStateAction<shoppingCartProduct | null>
  >
}

const ProductsContext = React.createContext<ProductsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function ProductsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<ProductsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<shoppingCartProduct | null>(null)
  return (
    <ProductsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </ProductsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const productsContent = React.useContext(ProductsContext)

  if (!productsContent) {
    throw new Error('useProducts has to be used within <ProductsContext>')
  }

  return productsContent
}
