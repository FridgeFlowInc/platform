import { createLazyFileRoute } from '@tanstack/react-router'
import ShoppingCardProducts from '@/features/shopping_cart'

export const Route = createLazyFileRoute('/_authenticated/shopping_cart/')({
  component: ShoppingCardProducts,
})
