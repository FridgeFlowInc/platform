import { axiosWithAuth } from '@/api/v1/wrappers'
import { Product } from '@/features/products/data/schema'

export async function shoppingCartProductList(): Promise<Product[]> {
  const response = await axiosWithAuth.get('/shopping_cart')
  return response.data
}
