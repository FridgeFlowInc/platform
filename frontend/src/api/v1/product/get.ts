import { axiosWithAuth } from '@/api/v1/wrappers'

export async function productGet(productData: string) {
  const response = await axiosWithAuth({
    method: 'post',
    url: `/product/search_by_qr`,
    data: productData,
  })
  return response.data
}
