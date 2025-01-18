import { axiosWithAuth } from '@/api/v1/wrappers'

export async function productDelete(productId: string) {
  const response = await axiosWithAuth({
    method: 'delete',
    url: `/product/${productId}`,
  })
  return response.data
}
