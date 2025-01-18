import { axiosWithAuth } from '@/api/v1/wrappers'

export async function productCreate(productData) {
  const response = await axiosWithAuth({
    method: 'post',
    url: `/product`,
    data: productData,
  })
  return response.data
}
