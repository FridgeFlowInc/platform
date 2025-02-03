import { axiosWithAuth } from '@/api/v1/wrappers'

export async function categoriesList(): Promise<string[]> {
  const response = await axiosWithAuth.get('/product/categories')
  return response.data
}
