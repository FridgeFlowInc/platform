import { axiosWithAuth } from '@/api/v1/wrappers'

export async function productUpdate(productId: string, productData: string) {
  const response = await axiosWithAuth({
    method: 'put',
    url: `/product/${productId}`,
    data: productData,
  })
  return response.data
}
