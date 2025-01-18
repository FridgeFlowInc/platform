import { axiosWithAuth } from '@/api/v1/wrappers'

export async function shoppingCartProductUpdate(
  shoppingCartProductId: string,
  shoppingCartProductData: string
) {
  const response = await axiosWithAuth({
    method: 'put',
    url: `/shopping_cart/${shoppingCartProductId}`,
    data: shoppingCartProductData,
  })
  return response.data
}
