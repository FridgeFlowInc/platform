import { axiosWithAuth } from '@/api/v1/wrappers'

export async function shoppingCartProductCreate(
  shoppingCartProductData: string
) {
  const response = await axiosWithAuth({
    method: 'post',
    url: `/shopping_cart`,
    data: shoppingCartProductData,
  })
  return response.data
}
