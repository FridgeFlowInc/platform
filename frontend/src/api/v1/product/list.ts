import { axiosWithAuth } from '@/api/v1/wrappers'
import { Product } from '@/features/products/data/schema'

export async function productList(): Promise<Product[]> {
  const response = await axiosWithAuth.get('/product')
  return response.data
}
